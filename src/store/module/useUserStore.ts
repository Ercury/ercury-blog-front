import { UserInfo } from '@/common/constant';
import { defineStore } from 'pinia';
import store from '../index'
import { createApp } from 'vue'
import App from "../../App.vue";


export const  KEY_USERINFO= 'userInfo';
export const useUserStore = defineStore('userInfo', {
    state: (): Partial<UserInfo> => ({
        username: '',
        email: '',
        role: '',
        avatar: '',
        createTime: new Date(),
        status: -1,
        token: ''
    }),

    getters: {

    },

    actions: {
        setToken(token: string): void {
            this.token = token;
        },
        setStatus(status: number): void {
            this.status = status;
        },
        logout(): void {
            this.$reset();
            sessionStorage.removeItem(KEY_USERINFO);
        },
        setLogin(userInfo: Partial<UserInfo>): void {
            this.$state = {
                ...this.$state,
                ...userInfo
            }
        }
    }
})

//创建userStore实例
createApp(App).use(store);
const instance = useUserStore();


//监测state变化
instance.$subscribe((mutations, state) => {
    sessionStorage.setItem(KEY_USERINFO, JSON.stringify(state));
})

//init
const initUserInfo = sessionStorage.getItem(KEY_USERINFO);
if(initUserInfo) {
    instance.setLogin(JSON.parse(initUserInfo));
}
