import { createApp } from 'vue'
import App from './App.vue'
// 导入element-plus图标库
import * as Icons from '@element-plus/icons-vue';
// 暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入iconify文件
import '@purge-icons/generated';
// 引入animate.css
import 'animate.css/animate.min.css';
// 引入全局样式
import '@/assets/style/global.less';
// 加载国际化文件
import i18n from '@/assets/i18n'
import router from './router';
import store from './store/index';
import refreshHandleRoute from './utils/refreshHandleRoute';
// 表单验证库
import { vue_best_verify } from "vue-best-verify";
import "vue-best-verify/dist/style.css";
const app = createApp(App);


//开始使用全局elememt图标
const icons: any = Icons;
for (const key in icons) {
    app.component(key, icons[key]); //全局注册一下组件(全部图标注册组件)
}
refreshHandleRoute().then(() => {
    app.use(i18n).use(vue_best_verify).use(store).use(router).mount('#app');
})
app.config.globalProperties.$elIcons = Icons; // 将全局注册的icon组件挂在到vue实例上
