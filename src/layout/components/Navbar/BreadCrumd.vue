<script lang='ts' setup='setup'>
import { ArrowRight } from '@element-plus/icons-vue'
import { translate } from "@/assets/i18n/index"
import { useRoute } from 'vue-router';
const titleList = computed(() => useRoute().matched)
</script>

<template>
    <div :separator-icon="ArrowRight">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item class="border-style" v-for="item in titleList" :key="item.path">
                <template v-if="item.meta && item.meta.title">
                    {{ translate(item.meta.title as string) }}
                </template>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style lang='less' scoped>
.breadcrumd-style {
    width: 100%;
    height: 30%;
}
</style>