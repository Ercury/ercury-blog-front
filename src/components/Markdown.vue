
<template>
  <md-editor v-model="markdownContent" :previewOnly="props.previewOnly" class="theme" :previewTheme="props.previewTheme" placeholder="请输入内容..." />
</template>

<script lang='ts' setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// 引入公共库中的预览主题
import '@vavt/md-editor-extension/dist/previewTheme/krafty.css';

// markdown内容
const markdownContent = ref('');

// 定义自定义事件向父组件传递数据
// const emits = defineEmits(['change']);
const props = defineProps({
  markdownContent: {
    type: String,
    default: ''
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  previewTheme: {
    type: String,
    default: 'default'
  }
})

watch(props, (oldValue, newValue) => {
  markdownContent.value = props.markdownContent;
})

const getContent = () => {
  return markdownContent.value;
}

defineExpose({ getContent });

</script>

<style lang="less">
  .theme {
    background-color: @dark-theme;
    color: @general-font-color;
  }
</style>