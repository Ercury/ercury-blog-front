<script lang='ts' setup='setup'>
defineProps<{
  modalValue?: boolean
}>()
</script>

<template>
  <el-dialog :model-value="modalValue">
    <slot name="header"></slot>
    <slot></slot>
  </el-dialog>
</template>

<style lang='less' scoped></style>