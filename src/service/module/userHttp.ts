import { LoginFormField } from "@/common/constant";
import _http from '../http';

export class UserRequests {
    private LoginUrl = '/login';
    
    // 登陆请求函数
    public reqLogin = (params: LoginFormField): Promise<any> => {
        return _http({
            url: this.LoginUrl,
            method: 'POST',
            data: {...params}
        })
    }
}



