import { createApp } from 'vue'
import App from './App.vue'
// 导入antd图标库
import * as Icons from '@ant-design/icons-vue';
//引入iconify文件
import '@purge-icons/generated';
// 引入全局样式
import '@/assets/style/global.less';
// 加载国际化文件
import i18n from '@/assets/i18n'
import router from './router';
import store from './store';
import refreshHandleRoute from './utils/refreshHandleRoute';
const app = createApp(App);

//开始使用全局Antd图标
const icons: any = Icons;
for (const key in icons) {
    app.component(key, icons[key]); //全局注册一下组件(全部图标注册组件)
}
refreshHandleRoute().then(() => {
    app.use(i18n).use(router).use(store).mount('#app');
})
app.config.globalProperties.$antIcons = Icons; // 将全局注册的icon组件挂在到vue实例上

