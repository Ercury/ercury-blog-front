<script lang='ts' setup='setup'>
import { ComponentInternalInstance, getCurrentInstance } from "vue";
import { translate } from "@/assets/i18n/index"
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
                <SideItem
                    :item="Object.assign({}, {...item.children[0], meta: {...item.meta, ...item.children[0].meta}})">
                </SideItem>
            </template>
            <el-sub-menu v-else :index="item.name">
                <template #title>
                    <template v-if="item.meta && item.meta.icon">
                        <component class="icon" :is="appContext?.config.globalProperties.$elIcons[item.meta.icon]" />
                    </template>
                    <span>{{ translate(item.meta.title) }}</span>
                </template>
                <template v-for="child in item.children" :key="child.name">
                    <SideItem :item="child"></SideItem>
                </template>
            </el-sub-menu>
        </template>
        <el-menu-item v-else :index="item.name" v-if="item.name">
                <template v-if="item.meta && item.meta.icon">
                    <component class="icon" :is="appContext?.config.globalProperties.$elIcons[item.meta.icon]" />
                </template>
                <span>{{ translate(item.meta.title) }}</span>
        </el-menu-item>
    </template>
</template>

<style lang='css' scoped>
.icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-right: 5px;
}
</style>