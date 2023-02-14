import { LoginFormField } from "@/common/constant";
import _http from '@/service/requests';
import { BaseResp } from '@/types/responseData';
import { UserInfo } from '@/common/constant';

export class UserRequests {
    // 用户登录
    private LOGIN_URL = '/login';
    
    // 登陆请求函数
    public reqLogin = (params: LoginFormField): Promise<BaseResp<UserInfo>> => {
        return _http({
            url: this.LOGIN_URL,
            method: 'POST',
            data: {...params}
        })
    }
}



