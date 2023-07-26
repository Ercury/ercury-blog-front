<template>
  <div class="post-detail">
    <div class="content">
      <markdown mode="preview" :previewContent="state.postInfo.markDownContent" previewTheme="default" />
    </div>
    <div class="catalog">
      <markdown mode="catalog"></markdown>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { articleApi } from '@/service/module/articleHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { ArticleListData } from '@/common/constant';

const route = useRoute();

const state = reactive({
  postInfo: {} as ArticleListData
})
onMounted(() => {
  getPostDetail();
})

// 文章详情
function getPostDetail(): void {
  articleApi.findArticle(route.query.id as string).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      state.postInfo = resp.article;
    }
  })
}
</script>

<style lang='css' scoped>
.post-detail {
  display: grid;
  grid-template-columns: 50%;
  /* column-gap: 8%; */
  justify-content: center;
  background-color: var(--view-body-bg-color);
}

.content :deep(.md-editor-previewOnly) {
  border-radius: 20px;
  background-color: var(--view-body-bg-color);
  color: #a9b7c6 !important;
}

.catalog {
  width: 13%;
  height: 80%;
  overflow: scroll;
  position: fixed;
  right: 8%;
  bottom: 100px;
  color: #a9b7c6;
  background-color: #191919;
  border-radius: 10px;
  padding: 10px;
}

/* 隐藏滚动条 */
.catalog::-webkit-scrollbar {
  width: 0 !important
}
</style>