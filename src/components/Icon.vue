<script lang='ts' setup='setup'>
const props = defineProps<{
    icon: string,
    class?: string
}>();
</script>

<template>
    <span :class="props.class">
        <span :data-icon="props.icon" class="iconify"></span>
    </span>
</template>

<style lang='css' scoped>
.iconify {
    color: inherit;
}
</style>
