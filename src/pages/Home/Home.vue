<script lang='ts' setup>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import Header from "@/components/Header/Header.vue";
import Main from "@/components/Main/Main.vue";
</script>

<template>
  <a-layout class="layout">
    <Header></Header>
    <a-layout>
      <Sidebar></Sidebar>
      <a-layout-content class="layout-main">
        <Main></Main>
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-footer class="layout-footer">Footer</a-layout-footer> -->
  </a-layout>
</template>

<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>