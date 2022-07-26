<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/sidebar';
import AppIcon from '@/components/AppIcon.vue';
const sidebar = useSidebarStore();
const collapseChage = () => {
    sidebar.handlecollapse();
}
</script>
<template>
<div class="layout-header">
      <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <app-icon v-if="!sidebar.collapse" icon="ant-design:menu-fold-outlined">
            </app-icon>
            <app-icon v-else="sidebar.collapse" icon="ant-design:menu-unfold-outlined">
            </app-icon>
        </div>
</div>
</template>

<style lang='less' scoped>
 .layout-header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    font-size: 22px;
    color: #fff;
    background-color: #9e9e;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
    height: 70px;
}

</style>