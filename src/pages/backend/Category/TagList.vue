<template>
  <div class="main-content">
    <div class="search-bar">
      <div class="bar-left">
        <el-button class="btn" @click="addTag">{{ '新增标签' }}</el-button>
      </div>
      <div class="bar-right">
        <el-input v-model="state.searchValue" placeholder="请输入搜索内容"></el-input>
      </div>
    </div>
    <el-table :data="state.tableConfig.srcData">
      <template v-for="column in state.tableConfig.columns">
        <el-table-column :label="column.title" :prop="column.key" />
        <el-table-column v-if="column.key === 'operation'" :label="column.title" v-slot="{ row }">
          <el-button v-for="item in currentOperationMenu" :key="item.key" size="small" round :color="item.color"
            @click="handleRow(item.key, row)">
            {{ item.label }}
          </el-button>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination background v-model:current-page="state.tableConfig.currentPage"
      v-model:page-size="state.tableConfig.pageSize" :page-sizes="[10, 20, 50]" layout="sizes, prev, pager, next"
      :hide-on-single-page="true" :small="true" :total="state.tableConfig.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" class="pagination" />
  </div>
  <el-dialog v-model="state.editTemplateShow" :title="state.isEdit ? '添加标签' : '编辑标签'" width="25%">
    <el-form v-verify="state.verify">
      <el-form-item label="标签名称">
        <el-input v-model="state.form.tagName" verify="required"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.editTemplateShow = false" class="btn">取消</el-button>
        <el-button type="primary" @click="save" class="btn">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang='ts' setup>
import { translate } from '@/assets/i18n/index';
import { tagApi } from '@/service/module/tagHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { TableColumns } from '@/common/header';
import { cloneDeep } from 'lodash';
import { TagListData } from '@/common/constant';
import type { VerifyOptions as Verify } from "vue-best-verify";
import { message } from '@/common/message';
import { ElMessageBox } from 'element-plus';

const state = reactive({
  verify: {} as Verify,
  // 表格配置
  tableConfig: {
    columns: TableColumns.TAG_COLUMNS,
    currentPage: 1,
    pageSize: 10,
    srcData: [],
    total: 0
  },
  // 操作按钮
  operationMenu: cloneDeep(TableColumns.OPERATION_BUTTONS),
  // 搜索字符
  searchValue: '',
  // 是否显示编辑弹窗
  editTemplateShow: false,
  // 是否编辑
  isEdit: false,
  form: {
    tagName: '',
    _id: ''
  }
})

// 表单初始值
const initialForm = toRaw(state.form);

onMounted(() => {
  getTagList();
})

watch(
  () => state.isEdit,
  (newValue, oldValue) => {
  if (!newValue) restForm();
})

const currentOperationMenu = computed(() => {
  return state.operationMenu.filter(operation => operation.status === 0);
})

const addTag = (): void => {
  state.editTemplateShow = true;
  state.isEdit = false;
}

const save = async (): Promise<any> => {
  if (!state.verify.do_verify()) {
    return;
  }
  if (state.isEdit) {
    try {
      const { error_code } = await tagApi.updateTag(state.form);
      if (error_code === RESP_CODE.SUCCESS_CODE) {
        getTagList();
        message.success('修改成功');
        state.editTemplateShow = false;
      }
    } catch (error) { }
  } else {
    try {
      const { error_code } = await tagApi.addTag({ tagName: state.form.tagName });
      if (error_code === RESP_CODE.SUCCESS_CODE) {
        getTagList();
        message.success('新增成功');
        state.editTemplateShow = false;
      }
    } catch (error) { }
  }
}

const handleRow = (type: string, row: TagListData) => {
  type === 'edit' ? handleEdit(row) : handleDelete(row);
}

// pageSize变化
const handleSizeChange = (): void => {
  getTagList();
}

// 页码变化
const handleCurrentChange = (): void => {
  getTagList();
}

function handleEdit(row: TagListData): void {
  state.editTemplateShow = true;
  state.isEdit = true;
  state.form = JSON.parse(JSON.stringify(row));
}

function handleDelete(row: TagListData): void {
  ElMessageBox.confirm(
    `确定删除标签${row.tagName}吗?`,
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  ).then(() => {
    tagApi.deleteTag(row._id).then(resp => {
      if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        getTagList();
        message.success('删除成功')
      }
    })
  })
}

// 获取列表数据
async function getTagList(): Promise<any> {
  const params = {
    pageNo: state.tableConfig.currentPage,
    pageSize: state.tableConfig.pageSize
  }
  try {
    const { error_code, error_msg, tagList, total } = await tagApi.getTagList(params);
    if (error_code === RESP_CODE.SUCCESS_CODE) {
      state.tableConfig.srcData = tagList;
      state.tableConfig.total = total;
    }
  } catch (error) { }
}

// 表单数据恢复初始值
function restForm(): void {
  state.form = initialForm;
}

</script>


<style lang='css' >
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
}

.btn {
  width: 110px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>