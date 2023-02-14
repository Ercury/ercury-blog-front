<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/module/userSidebarStore';
const sidebarStore = useSidebarStore();
const collapseChage = () => {
    sidebarStore.handlecollapse();
}
</script>

<template>
    <div class="header-left">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <app-icon v-show="!sidebarStore.collapse" icon="ant-design:menu-fold-outlined" class="collapse-btn-size">
            </app-icon>
            <app-icon v-show="sidebarStore.collapse" icon="ant-design:menu-unfold-outlined" class="collapse-btn-size">
            </app-icon>
        </div>
        <!-- logo  -->
        <div class="header-logo">
            <router-link to=""></router-link>
        </div>
    </div>
</template>

<style lang='less' scoped>
.header-left {
    display: flex;
    width: 200px;
    .collapse-btn {
        cursor: pointer;
        line-height: 70px;
        .collapse-btn-size {
            font-size: 25px;
        }
    }
    .header-logo {
        width: 134px;
        background: url(@/assets/images/logo.png) no-repeat scroll top/cover;
        cursor: pointer;
    }
}
</style>