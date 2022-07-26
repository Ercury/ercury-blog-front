import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
// 引入全局样式
import '@/assets/style/global.less';

const app = createApp(App);

app.use(router);

app.mount('#app');
