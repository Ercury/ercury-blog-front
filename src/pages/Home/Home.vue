<script lang='ts' setup>
import { DesktopOutlined } from "@ant-design/icons-vue";
import Sidebar from '@/components/Sidebar/Sidebar.vue'
</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">Header</a-layout-header>
    <Sidebar></Sidebar>
    <a-layout-content class="layout-main">Content</a-layout-content>
    <a-layout-footer class="layout-footer">Footer</a-layout-footer>
  </a-layout>
</template>

<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>