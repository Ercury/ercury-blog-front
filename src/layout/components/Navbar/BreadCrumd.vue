<script lang='ts' setup='setup'>
import { useRoute } from 'vue-router';
const titleList = computed(() => useRoute().matched)
</script>

<template>
    <div class="breadcrumd-style">
        <a-breadcrumb separator=">">
            <a-breadcrumb-item class="border-style" v-for="item in titleList" :key="item.path">
                <template v-if="item.meta && item.meta.title">
                    {{ $t(item.meta.title as string) }}
                </template>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>
<style lang='less' scoped>
.breadcrumd-style {
    width: 100%;
    height: 30%;
    :deep(.ant-breadcrumb) {
        // border-bottom: 1px solid gray;
    }
}
</style>