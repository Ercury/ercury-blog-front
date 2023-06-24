<script lang='ts' setup>
import Navbar from "@/layout/components/Navbar/Navbar.vue";
import Sidebar from "@/layout/components/Sidebar/Sidebar.vue";
</script>
    
<template>
    <el-container class="layout">
        <el-header>
            <Navbar></Navbar>
        </el-header>
        <el-container>
            <Sidebar></Sidebar>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang='less' scoped>
.layout {
    width: 100%;
    height: 100%;
    :deep(.el-header) {
        width: 100%;
        height: 70px;
        background-color: @dark-theme;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 2px 8px #000000a6 !important;
        z-index: 2000 !important; // 两个盒子贴一起看不到阴影效果
    }
    :deep(.el-main) {
        background-color: @dark-theme;
    }
}
</style>