<script lang='ts' setup='setup'>
import { ComponentInternalInstance, getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
defineProps({
    item: {
        type: Object,
        required: true
    }
})

const hasOnlyOneChild = (item: Record<string, any>) => {
    return item.children && item.children.length === 1;
}
</script>

<template>
    <template v-if="!item.meta?.hidden">
        <template v-if="item.children">
            <template v-if="hasOnlyOneChild(item)">
                <SideItem :item="Object.assign({}, {...item.children[0], meta: {...item.meta, ...item.children[0].meta}})"></SideItem>
            </template>
            <a-sub-menu v-else :key="item.name">
                <template #title>
                    <template v-if="item.meta && item.meta.icon">
                        <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.meta.icon]" />
                    </template>
                    <span>{{ item.name }}</span>
                </template>
                <template v-for="child in item.children" :key="child.name">
                    <SideItem :item="child"></SideItem>
                </template>
            </a-sub-menu>
        </template>
        <a-menu-item v-else :key="item.name">
            <router-link :to="{name: item.name }">
                <template v-if="item.meta && item.meta.icon">
                    <component class="icon" :is="appContext?.config.globalProperties.$antIcons[item.meta.icon]" />
                </template>
                <span>{{ item.name }}</span>
            </router-link>
        </a-menu-item>
    </template>
</template>

<style lang='less' scoped>

</style>