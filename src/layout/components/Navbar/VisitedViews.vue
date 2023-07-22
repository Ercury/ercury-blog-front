<script lang='ts' setup='setup'>
import { useTagsViewStore } from '@/store/module/useTagsViewStore';
import { Ref, VueElement, ref } from 'vue';
import { RouteRecordName, _RouteRecordBase } from 'vue-router';
import { useRoute, useRouter } from "vue-router"
import { translate } from "@/assets/i18n/index"
const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
// 获取访问过的路由
const { visitedViews } = storeToRefs(tagsViewStore);

//右键菜单是否显示
const visible = ref(false);

// tagview右键菜单
const menu: Ref<VueElement | null> = ref(null)

// 跳转到目标路由
const goTargetView = (view: _RouteRecordBase) => {
    router.push(view)
}

// 关闭tagview
const delTargetVisited = (name: RouteRecordName | undefined) => {
    tagsViewStore.deleteVisitedView(name);
    // 如果删除的是当前active路由,跳转到visitedViews的最后一个
    if (name === route.name && visitedViews.value.length > 1) {
        router.push({ name: visitedViews.value[visitedViews.value.length - 1].name });
    }
}

// 当前右键view
const mouseRightView: Ref<_RouteRecordBase> = ref({
    name: "",
    path: "",
    meta: {
        fixed: false,
    },
})

// 鼠标右键点击
const mouseRightClick = (view: _RouteRecordBase, event: any) => {
    // 存储右键view
    mouseRightView.value = view;
    // 显示右键菜单
    showMenu(event.clientX, event.clientY);
}

// 显示右键菜单
const showMenu = (left: number, top: number) => {
    // 浏览器添加click关闭右键菜单
    window.addEventListener("click", hideMenu)
    visible.value = true;
    if (menu.value) {
        menu.value.style.left = `${left}px`;
        menu.value.style.top = `${top + 10}px`;
    }
}

// 关闭右键菜单
const hideMenu = () => {
    visible.value = false
}

const refresh = () => {

}

// 右键关闭路由
const close = () => {
    delTargetVisited(mouseRightView.value.name);
}

const closeOther = () => {
    tagsViewStore.deleteOtherVisitedView(mouseRightView.value);
    // 如果右键路由不是当前路由路径,路由跳转到右键路由
    if (mouseRightView.value.name !== route.name) {
        router.push({ name: mouseRightView.value.name });
    }
}

const closeAll = async () => {
    await tagsViewStore.clearVisitedView();
    await tagsViewStore.clearCacheView();
}
</script>

<template>
    <div class="visited_views">
        <template v-for="view in visitedViews" :key="view.name">
            <div @click="goTargetView(view)" @contextmenu.prevent="mouseRightClick(view, $event)">
                {{ translate(view.meta.title) }}
                <el-icon :style="{ fontSize: '14px' }" @click.stop="delTargetVisited(view.name)">
                    <Close />
                </el-icon>
            </div>
        </template>
        <ul v-show="visible" ref="menu" class="menu">
            <li @click="refresh">刷新</li>
            <li v-if="mouseRightView.meta && !mouseRightView.meta.fixed" @click="close">
                关闭
            </li>
            <li @click="closeOther">关闭其他</li>
            <li @click="closeAll">关闭所有</li>
        </ul>
    </div>
</template>

<style lang='css' scoped>
.visited_views {
    color: var(--general-font-color);
}

.visited_views>div {
    height: 24px;
    margin-top: 10px;
    margin-right: 5px;
    padding: 0 10px;
    display: inline-block;
    line-height: 24px;
    border: 1px solid #675894;
    border-radius: 5px;
    cursor: pointer;
}

.visited_views .menu {
    width: 100px;
    padding: 5px 10px;
    position: absolute;
    z-index: 9999;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    list-style: none;
    background-color: var(--dark-theme);
}

.visited_views .menu>li {
    padding: 5px 2px;
}

.visited_views .menu>li:hover {
    color: #3477f2;
    cursor: pointer;
}
</style>