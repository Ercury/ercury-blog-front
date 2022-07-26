<script lang='ts' setup='setup'>
import { menuList } from '@/assets/common';
import { ComponentInternalInstance, getCurrentInstance } from "vue";
import { useSidebarStore } from '@/store/sidebar';
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const sidebar = useSidebarStore();
</script>
<template>
    <div class="layout-sider">
        <a-menu mode="inline" theme="dark" :inline-collapsed="sidebar.collapse">
            <template v-for="item in menuList">
                <template v-if="item.subs">
                    <a-sub-menu :key="item.index">
                        <template #title>
                            <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.icon]" />
                            <span>{{ $t(item.title) }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <template v-if="subItem.subs">
                                <a-sub-menu :key="subItem.index">
                                    <template #title>{{ $t(subItem.title) }}</template>
                                    <a-menu-item v-for="threeItem in subItem.subs" :key="threeItem.index">
                                        <span>{{ $t(item.title) }}</span>
                                    </a-menu-item>
                                </a-sub-menu>
                            </template>
                            <template v-else>
                                <a-menu-item :key="subItem.index">
                                    {{ $t(subItem.title) }}
                                </a-menu-item>
                            </template>
                        </template>
                    </a-sub-menu>
                </template>
                <template v-else>
                    <a-menu-item :key="item.index">
                        <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.icon]" />
                            <span>{{ $t(item.title) }}</span>
                    </a-menu-item>
                </template>
            </template>

        </a-menu>
    </div>
</template>

<style lang='less' scoped>
.layout-sider {
    width: 200px;
    height: 100%;
}

.icon {
    // padding-right: 25px;
}
</style>