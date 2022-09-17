import { createApp } from 'vue';
import App from '@/App.vue'
import { UserInfo } from '@/common/constant';
import { usePermissionStore } from '@/store/module/usePermissionStore';
import store from '../store/index';
// 页面刷新时处理路由

export default () => {
    return new Promise((resolve, reject) => {
        let userInfo: UserInfo;
        userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string);

        // 如果用户已经登录
        if (userInfo && userInfo.token) {
            const app = createApp(App);
            app.use(store)
            const permissionStore = usePermissionStore();
            permissionStore.handleRoutes().then(() => {
            resolve('refresh page success')
            })
        } else {
            resolve('login');
        }
    })
}