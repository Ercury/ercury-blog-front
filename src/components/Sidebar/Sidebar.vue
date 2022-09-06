<script lang='ts' setup='setup'>
import { menuList } from '@/common/menus';
import { ComponentInternalInstance, getCurrentInstance } from "vue";
import { useSidebarStore } from '@/store/module/userSidebarStore';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const sidebar = useSidebarStore();
const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});
</script>
<template>
    <a-layout-sider class="layout-sider" v-model:collapsed="sidebar.collapse" collapsible>
        <a-menu mode="inline" theme="dark">
            <template v-for="item in menuList">
                <template v-if="item.subs">
                    <a-sub-menu :key="item.routeName" v-if="item.icon">
                        <template #title>
                            <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.icon]" />
                            <span>{{ $t(item.title) }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <template v-if="subItem.subs">
                                <a-sub-menu :key="subItem.routeName">
                                    <template #title>{{ $t(subItem.title) }}</template>
                                    <a-menu-item v-for="threeItem in subItem.subs" :key="threeItem.routeName">
                                        <router-link :to="item.routeName">
                                            {{ $t(item.title) }}
                                        </router-link>
                                    </a-menu-item>
                                </a-sub-menu>
                            </template>
                            <template v-else>
                                <a-menu-item :key="subItem.routeName">
                                    <router-link :to="subItem.routeName">
                                       {{ $t(subItem.title) }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                        </template>
                    </a-sub-menu>
                </template>
                <template v-else>
                    <a-menu-item :key="item.routeName" v-if="item.icon">
                        <router-link :to="item.routeName">
                        <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.icon]" />
                            <span>{{ $t(item.title) }}</span>
                        </router-link>
                    </a-menu-item>
                </template>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<style lang='less' scoped>
.layout-sider {
    width: 200px;
    height: 100%;
}
</style>