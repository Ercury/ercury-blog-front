import { RESP_CODE } from "@/common/errorCode";
import axios from "axios";
import { KEY_USERINFO, UserInfo } from '../store/module/useUserStore';
import router from '@/router/index';
import Message from "@/common/message";

// 创建axios实例
const requests = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2000
})

/* 请求拦截器(请求之前做点事) */
requests.interceptors.request.use(config => {
    config = config || {};
    const userInfo = JSON.parse(sessionStorage.getItem(KEY_USERINFO)!) as UserInfo;
    if(userInfo?.token) {
        config.headers!['Authorization'] = `Bearer ${userInfo.token}`;
    }
    return config;
})

/* 响应拦截器 */
requests.interceptors.response.use(response => {
    const { status, data } = response || {};
    if(status === RESP_CODE.NO_PERMISSIONS) {
        router.push({name: 'Login'}).then();
        Message({tipType: 'error', content: '没有操作权限'});
    }
    if(status !== RESP_CODE.OK_CODE) {
        Message({tipType: 'error', content: '错误'});
    }
    return data;
}, err => {
    return Promise.reject(err.message);
})

export default requests;
