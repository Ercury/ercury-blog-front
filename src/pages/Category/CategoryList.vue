<template>
  <div class="main-content">
    <div class="search-bar">
      <div class="bar-left">
        <el-button class="btn" @click="addCategory">{{ '新增分类' }}</el-button>
      </div>
      <div class="bar-right">
        <el-input v-model="state.searchValue" placeholder="请输入搜索内容"></el-input>
      </div>
    </div>
    <el-table :data="state.categorySrcData">
      <template v-for="column in state.categoryColumns">
        <el-table-column :label="column.title" :prop="column.key" />
        <el-table-column v-if="column.key === 'operation'" v-slot="{ row }">
          <el-button v-for="item in currentOperationMenu" :key="item.key" size="small" round :color="item.color"
            @click="handleRow(item.key, row)">
            {{ item.label }}
          </el-button>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <el-dialog v-model="state.editTemplateShow" :title="state.isEdit ? '编辑分类' : '添加分类'" width="25%">
    <el-form v-verify="state.verify">
      <!-- 分类名称 -->
      <el-form-item label="分类名称">
        <el-input v-model="state.form.categoryName" verify="required, categoryName"></el-input>
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
import { translate } from '@/assets/i18n';
import { cloneDeep } from 'lodash';
import { TableColumns } from '@/common/header';
import { CategoryListData } from '@/common/constant';
import { categoryApi } from '@/service/module/categoryHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { message } from '@/common/message';
import type { VerifyOptions as Verify } from "vue-best-verify";

const state = reactive({
  // 分类数据
  categorySrcData: <Array<CategoryListData>>[],
  // 分类表头
  categoryColumns: cloneDeep(TableColumns.CATEGORY_COLUMNS),
  // 搜索
  searchValue: '',
  // dialog显示
  editTemplateShow: false,
  // form表单数据
  form: {
    _id: '',
    categoryName: ''
  },
  verify: {} as Verify,
  // 操作按钮
  operationMenu: cloneDeep(TableColumns.OPERATION_BUTTONS),
  // 编辑or新增
  isEdit: false
})

// 表单初始值
const initialForm = toRaw(state.form);



onMounted(() => {
  getCategoryList()
})


watch(
  () => state.isEdit,
  (newValue, oldValue) => {
    if (!newValue) restForm();
})

// 过滤操作按钮
const currentOperationMenu = computed(() => {
  return state.operationMenu.filter(operation => operation.status === 0);
})

// 新增按钮回调
const addCategory = (): void => {
  // 打开编辑弹窗
  state.editTemplateShow = true;
  state.isEdit = false;
}

const handleRow = (type: string, row: CategoryListData): void => {
  type === 'edit' ? handleEdit(row) : handleDelete(row);
}

const save = (): void => {
  if (!state.verify.do_verify()) {
    return;
  }
  if (state.form._id) {
    categoryApi.updateCategory(state.form).then(resp => {
      if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        getCategoryList();
        message.success('更新成功');
        state.editTemplateShow = false;
      }
    })
  } else {
    categoryApi.addCategory({ categoryName: state.form.categoryName }).then(resp => {
      if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        getCategoryList();
        message.success('添加成功');
        state.editTemplateShow = false;
      }
    })
  }
}

// 编辑按钮回调
function handleEdit(row: CategoryListData): void {
  state.editTemplateShow = true;
  state.isEdit = true;
  state.form = JSON.parse(JSON.stringify(row));
}

// 删除按钮回调
function handleDelete(row: CategoryListData): void {
  ElMessageBox.confirm(
    `确定删除分类${row.categoryName}吗?`,
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  ).then(() => {
    categoryApi.deleteCategory(row._id).then(resp => {
      if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        getCategoryList();
        message.success('删除成功');
      }
    })
  }).catch(() => { })
}

// 请求分类列表
function getCategoryList(): void {
  const params = {
    pageNo: 1,
    pageSize: 10
  }
  categoryApi.getCategoryList(params).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      state.categorySrcData = resp.categoryList;
    }
  })
}

// 表单数据恢复初始值
function restForm(): void {
  state.form = initialForm;
}

</script>

<style lang='less' scoped>
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