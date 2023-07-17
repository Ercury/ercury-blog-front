<template>
  <div class="wrapper">
    <Transition enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutRight">
      <nav class="left-side" v-if="state.navShow">
        <div class="left-side-header">Category</div>
        <div class="left-side-content">
          <li class="category-item" v-for="category in state.categoryList"
            :key="category._id">
            {{ category.categoryName }}
          </li>
        </div>
      </nav>
    </Transition>
    <div class="content">
      <post-list></post-list>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { categoryApi } from '@/service/module/categoryHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { CategoryListData } from '@/common/constant';

const state = reactive({
  categoryList: [] as CategoryListData[],
  navShow: false
})


onMounted(() => {
  state.navShow = true
  getCategories()
})

/*
  Query category list
 */
async function getCategories(): Promise<void> {
  const { error_code, dataList } = await categoryApi.getCategoryList({ pageNo: 1, pageSize: 99 })
  if (error_code === RESP_CODE.SUCCESS_CODE) {
    state.categoryList = dataList
  }
}
</script>

<style lang='less' scoped>
.animate__animated.animate__bounce {
  --animate-duration: 3s;
}
.wrapper {
  display: flex;
  justify-content: center;
}
.left-side {
  width: 14%;
  min-height: 30vh;
  position: fixed;
  left: 10%;
  top: 200px;
  color: #a9b7c6;
  background-color: var(@view-body-bg-color);
  border: 1px solid;
  border-color: var(@color-border-default);
  border-radius: 12px;
  box-shadow: 0px 0px 12px @menu-font-color;
}
.left-side-header {
  height: 60px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: large;
  line-height: 60px;
  border-bottom: 1px solid @color-border-default;
}
.left-side-content {}
.category-item {
  padding: 16px;
  cursor: pointer;
  transition: background-color .3s;
}
.category-item:last-child {
  margin-bottom: 10px;
}
.category-item:hover {
  background-color: #2a2f35;
}
.content {
  width: 45%;
}
</style>