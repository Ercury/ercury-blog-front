<script lang='ts' setup>
import { ArticleApi } from '@/service/module/articleHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
const articleApi = new ArticleApi();
const content = ref('');

// 获取文章详情
onMounted(()=> {
  articleApi.findArticle('64516d44537facdd6b2e38f7').then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        content.value = resp.article?.markDownContent;
    }
  })
})

</script>

<template>
<markdown :markdown-content="content" :preview-only="true" preview-theme="krafty"></markdown>
</template>

<style lang='less' scoped>

</style>