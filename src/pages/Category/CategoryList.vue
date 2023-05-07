<script lang='ts' setup='setup'>
import { translate } from '@/assets/i18n';
import { cloneDeep } from 'lodash';
import { TableColumns } from '@/common/header';
import { CategoryListData } from '@/common/constant';
import { CategoryApi } from '../../service/module/categoryHttp';
import { RESP_CODE } from '../../common/httpStatusCode';

// 分类表头
const categoryColumns = cloneDeep(TableColumns.CATEGORY_COLUMNS);
// 分类数据
let categorySrcData: Array<CategoryListData> = reactive([]);
// 实例化分类请求类
const categoryApi = new CategoryApi();

onMounted(() => {
  getCategoryList()
})

// 请求分类列表
function getCategoryList(): void {
  const params = {
    pageNo: 1,
    pageSize: 10
  }
  categoryApi.getCategoryList(params).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      categorySrcData.push(...resp.categoryList);
    }
  })
}
// 新增分类
const addCategory = (): void => {

}
</script>

<template>
  <div class="main-content">
  <el-button @click="addCategory">{{ translate('button.add_category') }}</el-button>
  <el-table :data="categorySrcData">
    <el-table-column v-for="column in categoryColumns" :label="column.title" :prop="column.key" />
  </el-table>
</div>
</template>

<style lang='less' scoped></style>