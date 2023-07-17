<template>
  <md-editor v-if="props.mode === 'editor'"
             v-model="markdownContent"
             class="theme"
             :htmlPreview="true"
            placeholder="请输入内容..." />
  <MdPreview v-if="props.mode === 'preview'"
            editorId="my-editor"
            v-model="previewContent"
            :previewTheme="props.previewTheme"
            :theme="props.theme"/>
  <MdCatalog v-if="props.mode === 'catalog'"
            :scrollElement="scrollElement"
            class="catalog"
            editorId="my-editor" />
</template>

<!--  style="background-color: #181c27 !important;" -->

<script lang='ts' setup>
import { MdPreview, MdEditor, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import 'md-editor-v3/lib/style.css';
// 引入公共库中的预览主题
// import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';

// markdown内容
const markdownContent = ref('');
const scrollElement = document.documentElement;
// 定义自定义事件向父组件传递数据
// const emits = defineEmits(['change']);
const props = defineProps({
  markdownContent: {
    type: String,
    required: false,
    default: '',
  },
  previewContent: {
    type: String,
    required: false,
    default: ''
  },
  previewTheme: {
    type: String,
    required: false,
    default: 'default'
  },
  mode: {
    type: String,
    required: true,
    default: 'preview'
  },
  theme: {
    type: String,
    required: false,
    default: 'dark'
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