<script lang='ts' setup='setup'>
const props = defineProps<{
    icon: string,
    class?: string | string[]
}>();
</script>

<template>
    <span clss="iconBox" :class="props.class">
        <span :data-icon="props.icon" class="iconify"></span>
    </span>
</template>

<style lang='less' scoped>
.iconBox {
    display: inline-flex;
    margin-left: 4px;
    font-size: 14px;
    line-height: 20px;
}
.iconify {
    color: inherit;
}
</style>
