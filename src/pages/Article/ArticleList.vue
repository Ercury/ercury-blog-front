<script lang='ts' setup>
import { ArticleListData } from '@/common/constant';
import { TableColumns } from '@/common/header';
import { RESP_CODE } from '@/common/httpStatusCode';
import { ArticleRequest } from '@/service/module/articleHttp';
import ArticleWrite from './ArticleWrite.vue';
import { ModalService } from "../../hooks/useDialog";
import { translate } from "@/assets/i18n/index"
// 文章列表表头
const articleColumns = TableColumns.ARTICLE_COLUMNS;
// 文章列表数据
const articleSrcData: Array<ArticleListData> = reactive([]);
// 实例化文章请求类
const articleRequest = new ArticleRequest();

onMounted(() => {
  getArticleList();
})

const article = ref(null);

// 获取文章列表数据
function getArticleList(): void {
  const params = {
    pageNo: 1,
    pageSize: 10
  }
  articleRequest.getArticleList(params).then(resp => {
    if (resp.error_code === RESP_CODE.OK_CODE) {
      articleSrcData.push(...resp.articleList);
    }
  })
}

// 新增文章
function addArticle(): void {
  ModalService.open(ArticleWrite, {msg: '向子组件传递prop'}, {
     title: '新增文章', // 弹窗标题
     alignCenter: true

  });
    
}

</script>

<template>
  <h1>文章列表</h1>
  <el-button @click="addArticle">{{ translate('button.add_article') }}</el-button>
  <el-table  ref="artilce" :data="articleSrcData">
      <el-table-column v-for="column in articleColumns"  :label="column.title" :prop="column.key"/>
  </el-table>
  
</template>

<style lang='less' >
.el-overlay-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  z-index: 99999;
  background-color: #eef0f3;
}
</style>