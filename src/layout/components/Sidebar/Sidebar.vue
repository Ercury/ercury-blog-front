<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/module/userSidebarStore';
import { useRoute } from 'vue-router';
import { usePermissionStore } from '@/store/module/usePermissionStore';
import SideItem from './SideItem.vue'
const sidebar = useSidebarStore();
const route = useRoute();
const permissionSotre = usePermissionStore();
const { routes } = storeToRefs(permissionSotre)
</script>
<template>
    <a-layout-sider class="layout-sider" :trigger="null" :collapsed="sidebar.collapse" collapsible>
        <a-menu class="menu" mode="inline" theme="light">
            <template v-for="item in routes" :key="item.path">
                <SideItem :item="item"></SideItem>
            </template>
        </a-menu>
    </a-layout-sider>
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