import { RESP_CODE } from "@/common/errorCode";
import axios from "axios";
import { KEY_USERINFO, UserInfo } from '../store/module/useUserStore';
import router from '@/router/index';

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
requests.interceptors.response.use(resp => {
    const { code, msg } = resp.data || {};
    if(code !== RESP_CODE.OK_CODE) {
        return Promise.reject(msg);
    }

    if(code === RESP_CODE.NO_PERMISSIONS) {
        router.push({name: 'Login'}).then();
        return Promise.reject(msg);
    }

    return Promise.resolve(resp);
})

export default requests;
