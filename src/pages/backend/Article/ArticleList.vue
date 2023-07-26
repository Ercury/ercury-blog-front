<template>
  <div class="main-content">
    <el-table :data="tableConfig.srcData.data">
      <template v-for="(column) in articleColumns" :key="column.key">
        <el-table-column v-if="column.key === 'tags'" :label="column.title" :prop="column.key">
          <template #default="{ row }">
            <div v-if="!row.isEdit" v-for="(item, index) in row.tags.map((tag: any) => tag.tagName)" :key="index"
              style="margin-top: 3px;">
              <el-tag>{{ item }}</el-tag>
            </div>
            <el-select v-else v-model="row[column.select as string]" multiple>
              <el-option v-for="item in column.options" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-else-if="column.key === 'operation'" v-slot="{ row }">
          <template v-for="item in !row.isEdit ? operationMenu.slice(0, 2) : operationMenu.slice(2, 4)" :key="item.key">
            <el-button size="small" round :color="item.color" :disabled="row.disabled" @click="handleRow(item.key, row)">
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column v-else :label="column.title" :prop="column.key">
          <template #default="{ row }">
            <template v-if="!row.isEdit">
              <span v-if="column.key === 'category'">{{ row[column.key].categoryName }}</span>
              <span v-else-if="column.key === 'status'">{{ ARTICLE_STATUS.get(row[column.key]) }}</span>
              <span v-else-if="column.key === 'createTime'">{{ moment(row[column.key]).utc().format('YYYY-MM-DD') }}</span>
              <span v-else>{{ row[column.key] }}</span>
            </template>
            <template v-else>
              <el-select v-if="column.type === 'select'" v-model="row[column.select as string]">
                <el-option v-for="item in column.options" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
              <el-input type="textarea" v-if="column.type === 'text'" v-model="row[column.key]" />
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination background v-model:current-page="tableConfig.srcData.currentPage"
      v-model:page-size="tableConfig.srcData.pageSize" :page-sizes="[10, 20, 50]" layout="sizes, prev, pager, next"
      :hide-on-single-page="true" :small="true" :total="tableConfig.srcData.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" class="pagination" />
  </div>
</template>


<script lang='ts' setup>
import ArticleWrite from './ArticleWrite.vue';
import { ArticleListData, AddArticleField } from '@/common/constant';
import { TableColumns, ARTICLE_STATUS } from '@/common/header';
import { RESP_CODE } from '@/common/httpStatusCode';
import { ArticleApi } from '@/service/module/articleHttp';
import { useDialog } from "@/hooks/useDialog";
import { translate } from "@/assets/i18n/index"
import { cloneDeep } from 'lodash';
import { CategoryApi } from '@/service/module/categoryHttp';
import { TagApi } from '@/service/module/tagHttp';
import { message } from '@/common/message';
import moment from 'moment';

// 实例化文章请求类
const articleApi = new ArticleApi();
// 实例化分类请求类
const categoryApi = new CategoryApi();
// 实例化标签请求类
const tagApi = new TagApi();
// 文章列表表头
const articleColumns = cloneDeep(TableColumns.ARTICLE_COLUMNS);
// 文章分类选项
const articleCategoryOptions = <Array<{ label: string, value: string }>>([]);
// 文章标签选项
const articleTagOptions = <Array<{ label: string, value: string }>>([]);
// 操作按钮
const operationMenu = reactive(TableColumns.OPERATION_BUTTONS);
// 编辑行原数据
const oldRowData: any = markRaw({});
// 表格配置
const tableConfig = reactive({
  srcData: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    data: <Array<ArticleListData>>[]
  }
})
onMounted(() => {
  // 请求文章列表
  getArticleList();
  if (!articleCategoryOptions.length || !articleTagOptions.length) {
    // 请求分类
    getCategory();
    // 请求标签
    getTag();
  }
  // 初始化表头
  initColumn();
})

// pageSize变化
const handleSizeChange = (): void => {
  getArticleList();
}

// 页码变化
const handleCurrentChange = (): void => {
  getArticleList();
}


// 行操作
const handleRow = (type: string, row: ArticleListData): void => {
  switch (type) {
    case 'edit':
      handleEdit(row);
      break;
    case 'delete':
      handleDelete(row);
      break;
    case 'save':
      handleSave(row);
      break;
    case 'cancel':
      handleCancel(row);
      break;
    default:
      break;
  }
}

// 删除
const handleDelete = (row: ArticleListData): void => {
  ElMessageBox.confirm(
    `确定删除文章${row.title}吗?`,
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  )
    .then(() => {
      articleApi.deleteArticle(row._id).then(resp => {
        if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
          ElMessage.success('删除成功')
          // Message({ type: 'success', message: '删除成功' });
          getArticleList();
        }
      })
    })
    .catch(() => { })

}

// 取消
const handleCancel = (row: ArticleListData): void => {
  // 取消所有行按钮禁用
  tableConfig.srcData.data.forEach(item => { item.disabled = false })
  // 将编辑行老数据重新赋值给编辑行
  Object.assign(row, oldRowData);
  row.isEdit = false;


}

//编辑
const handleEdit = (row: ArticleListData): void => {
  // 非编辑行禁止编辑
  tableConfig.srcData.data.forEach(item => {
    if (row._id !== item._id) {
      item.disabled = true
    }
  })
  Object.assign(oldRowData, row);
  row.isEdit = true;

}

// 保存
const handleSave = (row: ArticleListData): void => {
  updateArticle(row)
}

// 初始化表头和操作按钮
function initColumn(): void {
  articleColumns.forEach(column => {
    if (column.key === 'category') {
      column.options = articleCategoryOptions;
    }
    if (column.key === 'tags') {
      column.options = articleTagOptions;
    }
    if (column.key === 'status') {
      column.options = [{ label: '草稿', value: 0 }, { label: '已发布', value: 1 }];
    }
  })
}

// 获取文章列表数据
function getArticleList(): void {
  const params = {
    pageNo: tableConfig.srcData.currentPage,
    pageSize: tableConfig.srcData.pageSize
  }
  articleApi.getArticleList(params).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      tableConfig.srcData.data = [];
      resp.articleList.forEach((article: ArticleListData) => {
        tableConfig.srcData.data.push(new ArticleListData(article))
      });
      tableConfig.srcData.total = resp.total;
    }
  })
}

// 更新文章
function updateArticle(row: ArticleListData): void {
  articleApi.updateArticle(setParams(row)).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      getArticleList();
      message.success('更新成功');
    }
  })
}

// 过滤请求参数
function setParams(row: ArticleListData): any {
  return {
    category: row.categorySelect,
    tags: row.tagSelect,
    status: row.status,
    title: row.title,
    _id: row._id
  }

}

// 获取文章分类
function getCategory(): void {
  categoryApi.getCategoryList({ pageNo: 1, pageSize: 99 }).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      resp.dataList.forEach((category: { categoryName: string, _id: string }) => {
        articleCategoryOptions.push({ label: category.categoryName, value: category._id });
      });
    }
  })
}

// 获取文章标签
function getTag(): void {
  tagApi.getTagList({ pageNo: 1, pageSize: 99 }).then(resp => {
    resp.tagList.forEach((tag: { tagName: string, _id: string }) => {
      articleTagOptions.push({ label: tag.tagName, value: tag._id })
    });
  })
}

</script>

<style lang='css' scoped>
.pagination {
  margin-top: 10px;
}
</style>