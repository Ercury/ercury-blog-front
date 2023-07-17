<template>
  <ul class="blog-list" v-if="state.latestPosts.length > 0">
    <li ref="card" class="post-card animate__animated animate__bounceInDown" v-for="(post, index) in state.latestPosts" :key="post._id">
      <!-- <div v-show="state.bgShow === post._id" class="post-entry-bg"></div> -->
      <div class="relative" @click="goDetail(post._id)" @mouseenter="showbg(index, 20)" @mouseleave="showbg(index, 12)">
        <div class="items-center gap-2">
          <time>{{ post.createTime }}</time>
          <span class="gap-point">·</span>
          <span>Ercury</span>
        </div>
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-content">
          <p>{{ post.markDownContent }}</p>
        </div>
        <div class="items-center">
          <span class="reach-detail">Learn more</span>
          <img src="../assets/images/right-fill.svg">
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang='ts' setup>
import { ArticleListData } from '@/common/constant'
import { RESP_CODE } from '@/common/httpStatusCode'
import { articleApi } from '@/service/module/articleHttp'

const router = useRouter();

// card reference
const card = ref();

const state = reactive({
  // 最新文章列表
  latestPosts: [] as ArticleListData[],
  bgShow: 0
})

onMounted(() => {
  getLatestPost()
})


// 文章详情跳转
const goDetail = (id: string): void => {
  router.push({ name: 'PostDetail', query: { id } });
}

// 文章卡片背景显示
const showbg = async (id: number, blurLength: number): Promise<void> => {
  // state.bgShow = id
  // 页面渲染完成后再获取元素
  await nextTick()
  card.value.find((li: Element, index: number) => index === id ).style.boxShadow = `0px 0px ${blurLength}px #fff`
}

// 获取最新文章列表
function getLatestPost(): void {
  const params = {
    pageNo: 1,
    pageSize: 10
  }
  articleApi.getArticleList(params).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      state.latestPosts = resp.articleList;
    }
  })
}
</script>

<style lang='less' scoped>
.blog-list {
  padding-bottom: 30px;
}
.post-card {
  position: relative;
  width: 100%;
  min-height: 160px;
  margin-top: 40px;
  background-color: @view-body-bg-color;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 12px @menu-font-color;
}

.post-card:first-child {
  margin-top: 0;
}

.relative {
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.gap-2 {
  display: flex;
  align-items: center;
  gap: 2%;
  tab-size: 4;
  color: #94A3B8;
}

.gap-point {
  font-weight: 700;
  color: @base-link-color;
}

.items-center {
  display: flex;
  gap: 1%;
}

.reach-detail {
  color: @base-link-color;
}

.post-title {
  padding-top: 1rem;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  letter-spacing: -.025em;
  color: @general-font-color;
}

.post-content {
  margin: 20px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: @general-font-color;
}

.post-entry-bg {
  position: absolute;
  top: -16px;
  right: -24px;
  bottom: -16px;
  left: -24px;
  background-color: rgb(148 163 184);
  border-radius: 16px;
  border-color: #564e5d;
  opacity: 0.1;
}
</style>