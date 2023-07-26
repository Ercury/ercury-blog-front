<template>
  <ul class="blog-list" v-if="state.latestPosts.length > 0">
    <li ref="card" class="post-card animate__animated animate__bounceInDown" v-for="(post, index) in  state.latestPosts "
      :key="post._id">
      <!-- <div v-show="state.bgShow === post._id" class="post-entry-bg"></div> -->
      <div class="grid-box" @click="goDetail(post._id)" @mouseenter="showbg(index, 20)" @mouseleave="showbg(index, 12)">
        <div class="grid-left">
          <div class="item-time">
            <time>{{ moment(post.createTime).utc().format('YYYY-MM-DD') }}</time>
            <span class="gap-point">·</span>
            <span>Ercury</span>
          </div>
          <div class="item-title">{{ post.title }}</div>
          <div class="item-link">
            <span class="reach-detail">Learn more</span>
            <img src="../assets/images/right-fill.svg">
          </div>
        </div>
        <div class="grid-right">
          <img :src="post.coverUrl ? post.coverUrl : state.defaultImg">
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang='ts' setup>
import { ArticleListData } from '@/common/constant'
import { RESP_CODE } from '@/common/httpStatusCode'
import { articleApi } from '@/service/module/articleHttp'
import moment from 'moment'

const router = useRouter();

// card reference
const card = ref();

const state = reactive({
  // 最新文章列表
  latestPosts: [] as ArticleListData[],
  bgShow: 0,
  // 默认图
  defaultImg: 'src/assets/images/dungeon.jpg'
})

onMounted(() => {
  getLatestPost()
})


// 文章详情跳转
const goDetail = (id: string): void => {
  router.push({ name: 'PostDetail', query: { id } });
}

// 文章卡片hover背景显示
const showbg = async (id: number, blurLength: number): Promise<void> => {
  // state.bgShow = id
  // 页面渲染完成后再获取元素
  await nextTick()
  card.value.find((li: Element, index: number) => index === id).style.boxShadow = `0px 0px ${blurLength}px #fff`
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

<style lang='css' scoped>
.blog-list {
  padding-bottom: 30px;
}

.post-card {
  position: relative;
  width: 90%;
  min-height: 200px;
  margin-top: 40px;
  background-color: var(--view-body-bg-color);
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 0px 12px var(--menu-font-color);
}

.post-card:first-child {
  margin-top: 0;
}

.grid-box {
  /* width: 100%; */
  height: 200px;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100%;
  cursor: pointer;
}

.grid-left {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  /* grid-auto-flow: row; */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
}

.grid-right {
  height: 100%;
}

.grid-right img {
  width: 100%;
  height: 100%;
}

.item-time {
  display: flex;
  align-items: start;
  gap: 2%;
  tab-size: 4;
  color: #94A3B8;
}
.item-title {
  display: flex;
  align-items: center;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  letter-spacing: -.025em;
  color: var(--general-font-color);
}
.item-link {
  display: flex;
  align-items: end;
}
.gap-point {
  font-weight: 700;
  color: var(--base-link-color);
}

.reach-detail {
  color: var(--base-link-color);
}

.post-content {
  margin: 20px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--general-font-color);
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