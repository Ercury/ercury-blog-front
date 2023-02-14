import { createI18n  } from "vue-i18n";

import zh  from './zh.json';
import en from './en.json'

const messages = {
    //英文
    en: {
      ...en,
    },
    // 中文
    zh: {
      ...zh,
    }
  }


// 默认语言
// const default_lang = "zh";

const i18n = createI18n({
  messages,
  // set locale messages
  // options: en | zh | es
  // set locale
  locale: localStorage.getItem('language') || 'zh',
  //如果设置true, translate() 函数将注册到全局
  globalInjection: true,
  //如果想在composition api中使用需要设置为false
  legacy: false, // you must specify 'legacy: false' option
})


// 翻译方法
export const translate = (key: string) => {
  if (!key) {
      return '';
  }
  return i18n.global.t(key);
};

export default i18n; //对外暴漏i18n, 在main.ts中挂载