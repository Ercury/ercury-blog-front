<template>
  <div class="post-detail">
    <div class="preview">
      <markdown mode="preview" :previewContent="state.postInfo.markDownContent" previewTheme="default"/>
    </div>
    <div class="catalog">
      <markdown mode="catalog"></markdown>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { articleApi } from '../../service/module/articleHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { ArticleListData } from '@/common/constant';

const route = useRoute();

const state = reactive({
  postInfo: <any>{},
  previewClass: {
    background: 'lightblue',
    width: '50%'
  }
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
  display: flex;
  justify-content: center;
  background-color: var(--view-body-bg-color);
}

.preview {
  width: 50%;
}

.preview :deep(.md-editor-previewOnly) {
  border-radius: 20px;
  background-color: var(--view-body-bg-color);
  color: #a9b7c6 !important;
}

.catalog {
  width: 13%;
  max-height: 100vh;
  position: fixed;
  right: 8%;
  color: #a9b7c6;
  background-color: #191919;
  border-radius: 10px;
  padding: 10px;
}
</style>