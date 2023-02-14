<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/module/userSidebarStore';
import { useRouter, useRoute } from 'vue-router';
import { usePermissionStore } from '@/store/module/usePermissionStore';
import SideItem from './SideItem.vue'   
import { MenuItemClicked } from 'element-plus';
const sidebar = useSidebarStore();
const router = useRouter();
const route = useRoute();
const permissionSotre = usePermissionStore();
const { routes } = storeToRefs(permissionSotre);

// menuItem选中回调
const handelSelect = (index: string) => {
    router.push({name: index});
}
</script>
<template>
    <el-aside class="layout-sider" :collapsed="sidebar.collapse">
        <el-menu class="menu el-menu-vertical-demo" :router="true" default-active="route.path" active-text-color="#ffd04b" @select="handelSelect" :collapsed="sidebar.collapse">
            <template v-for="item in routes" :key="item.path">
                <SideItem :item="item"></SideItem>
            </template>
        </el-menu>
    </el-aside>
</template>

<style lang='less' scoped>
.layout-sider {
    width: 200px;
    height: 100%;
    .menu {
        height: 100%;
    }
}
</style>