import { LoginFormField } from "@/common/constant";
import _http from '@/service/requests';
import { BaseResp } from '@/types/responseData';
import { UserInfo } from '@/common/constant';

export class UserRequests {
    private LoginUrl = '/login';
    
    // 登陆请求函数
    public reqLogin = (params: LoginFormField): Promise<BaseResp<UserInfo>> => {
        return _http({
            url: this.LoginUrl,
            method: 'POST',
            data: {...params}
        })
    }
}



