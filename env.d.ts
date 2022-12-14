/* ts的智能提示文件 */
/// <reference types="vite/client" />

/* 默认导出vue组件 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const Component: ReturnType<typeof defineComponent>
  export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_API_URL: string;
  readonly VITE_MAIN_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
