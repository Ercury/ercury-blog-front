<script lang='ts' setup='setup'>
import Logo from './Logo.vue';
import BreadCrumd from './BreadCrumd.vue';
import UserInfo from './UserInfo.vue';
import VisitedViews from './VisitedViews.vue';
</script>
<template>
    <div class="layout-header">
       <Logo></Logo>
       <div class="header-center">
           <BreadCrumd></BreadCrumd>
           <VisitedViews />
       </div>
       <UserInfo></UserInfo>
    </div>
</template>

<style lang='less' scoped>
.layout-header {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    // background-color: green;
    box-shadow: 0px 2px 8px #000000a6;
    z-index: 2020; // 两个盒子贴一起看不到阴影效果
}

.header-center {
    flex-grow: 1;
    overflow-y: hidden;
}
</style>