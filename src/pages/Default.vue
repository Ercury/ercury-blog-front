<template>
  <blog-header></blog-header>
  <!-- 占位div,消除header组件fixed定位脱离文档的影响 -->
  <div class="perch"></div> 
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
  <blog-footer></blog-footer>
</template>

<script lang='ts' setup>

</script>

<style lang='less' scoped>
.perch {
  height: 80px;
  background-color: @view-body-bg-color;
}
</style>