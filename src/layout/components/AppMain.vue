<script lang='ts' setup>
import Navbar from "@/layout/components/Navbar/Navbar.vue";
import Sidebar from "@/layout/components/Sidebar/Sidebar.vue";
</script>
    
<template>
    <a-layout class="layout">
        <Navbar></Navbar>
        <a-layout>
            <Sidebar></Sidebar>
                <a-layout-content>
                    <router-view>
                    </router-view>
                </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style lang='less' scoped>
.layout {
    width: 100%;
    height: 100%;
}
</style>