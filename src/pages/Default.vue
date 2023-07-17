<template>
  <div :class="{ 'background': state.showBackground }">
    <blog-header></blog-header>
    <!-- 占位div,消除header组件fixed定位脱离文档的影响 -->
    <div class="perch"></div>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
    <blog-footer></blog-footer>
  </div>
</template>

<script lang='ts' setup>

// current route
const route = useRoute()

const state = reactive({
  showBackground: false
})

// watch router changes，set background
watch(route, (n, o) => {
  state.showBackground = n.name === 'Home'
},
  { immediate: true }
)

</script>
<style lang='less' scoped>
.background {
  min-width: 1000px;
  /*min-width是为了实现让屏幕宽度在1000px以内时，div的大小保持不变,缩放屏幕宽度时，图片不要缩放*/
  z-index: -10;
  /*因为背景图片应该放在最下方，所以设置一个层级*/
  zoom: 1;
  background: url("@/assets/images/digital-graphicscat.jpg") no-repeat center center;
  /*背景图路径 背景图不平铺 背景图垂直、水平均居中 */
  background-size: cover;
  /* ---把背景图片放大到适合元素容器的尺寸，图片比例不变，但某些部分被切割无法显示完整背景图像 */
  background-attachment: fixed;
  /* 当内容高度大于图片高度时，背景图像的位置相对于 可视窗口 固定，此条属性必须设置 */
}

.perch {
  height: 70px;
}
</style>