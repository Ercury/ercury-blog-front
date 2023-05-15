<template>
  <div class="main-content">
  <el-table :data="tagState.tableConfig.srcData">
    <el-table-column v-for="column in tagState.tableConfig.columns" :label="column.title" :prop="column.key" />
  </el-table>
  <el-pagination background v-model:current-page="tagState.tableConfig.currentPage"
                 v-model:page-size="tagState.tableConfig.pageSize" 
                 :page-sizes="[10, 20, 50]"
                  layout="sizes, prev, pager, next" 
                  :hide-on-single-page="true"
                  small="small"
                 :total="tagState.tableConfig.total"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 class="pagination"/>

</div>
</template>


<script lang='ts' setup>
import { translate } from '../../assets/i18n/index';
import { TagApi } from '../../service/module/tagHttp';
import { RESP_CODE } from '../../common/httpStatusCode';
import {TableColumns} from '@/common/header';

const tagApi = new TagApi();
const tagState = reactive({
  tableConfig: {
      columns: TableColumns.TAG_COLUMNS,
      currentPage: 1,
      pageSize: 10,
      srcData: [],
      total: 0
  }
})

onMounted(()=> {
  getTagList();
})

// pageSize变化
const handleSizeChange = (): void => {
  getTagList();
}

// 页码变化
const handleCurrentChange = (): void => {
  getTagList();
}

// 获取列表数据
async function getTagList(): Promise<any> {
  const params = {
    pageNo: tagState.tableConfig.currentPage,
    pageSize: tagState.tableConfig.pageSize
  }
  try {
    const {error_code, error_msg, tagList, total}  = await tagApi.getTagList(params);
    if (error_code === RESP_CODE.SUCCESS_CODE) {
      tagState.tableConfig.srcData = tagList;
      tagState.tableConfig.total = total;
    }
  } catch (error) {}
}


</script>


<style lang='less' >

</style>