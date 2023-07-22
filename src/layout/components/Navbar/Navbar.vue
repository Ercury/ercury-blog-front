<script lang='ts' setup='setup'>
import Logo from './Logo.vue';
import BreadCrumd from './BreadCrumd.vue';
import UserInfo from './UserInfo.vue';
import VisitedViews from './VisitedViews.vue';
</script>
<template>
    <Logo></Logo>
    <div class="header-center">
        <BreadCrumd></BreadCrumd>
        <VisitedViews />
    </div>
    <UserInfo></UserInfo>
</template>

<style lang='css' scoped>
.header-center {
    flex-grow: 1;
    overflow-y: hidden;
    background-color: var(--dark-theme);
}
</style>