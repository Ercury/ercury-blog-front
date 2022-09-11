import { defineStore } from 'pinia';

export interface UserInfo {
    username: string;
    email: string;
    role: string;
    avatar: string;
    createTime: Date;
    status: number;
    token: string;
}
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


export default useUserStore;