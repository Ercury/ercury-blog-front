<script lang='ts' setup='setup'>
import { reactive } from 'vue';
import { LoginFormField } from '@/common/constant';
import { FormRules } from '@/common/formRules';
import { UserRequests  } from "@/service/module/userHttp";
import { RESP_CODE } from "@/common/errorCode";
import { message } from 'ant-design-vue';
import useUserStore from '@/store/module/useUserStore';
const formState: LoginFormField = reactive(new LoginFormField()) 
const userRequests = new UserRequests();
const user = useUserStore();

// 提交表单数据验证成功回调
const onFinish = (formField: LoginFormField): void => {
    console.log(formField);
    queryLogin(formField);
}
// 提交表单数据验证失败回调
const onFinishFailed = (err: any): void => {
    console.log(err);
    
}

// 登录接口
const queryLogin = (params: LoginFormField): void => {
    userRequests.reqLogin(params).then((resp) => {
        if(resp.code === RESP_CODE.OK_CODE) {
            message.success('登录成功');
            // user.setLogin(resp.data)
        }
    }).catch((err) => {
        message.error(err);
    })
}
</script>

<template>
    <div class="background-login">
        <div class="login-form">
            <a-form :model="formState" name="basic" :labelCol="{ span: 5, pull: 2 }" :wrapperCol="{ span: 16 }" class="label-color"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <!-- username -->
                <a-form-item :label="$t('form.login.user_name')" name="username"
                    :rules="FormRules.loginFormRules.username">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <!-- password -->
                <a-form-item :label="$t('form.login.password')" name="password"
                    :rules="FormRules.loginFormRules.password">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <!-- remember -->
                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">{{$t('form.login.remember_me')}}</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 10, span: 10 }">
                    <a-button type="primary" html-type="submit">{{$t('common.submit')}}</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style lang='less' scoped>
.background-login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/02.jpg) no-repeat left center / cover;
    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        
    }
    .login-form :deep(.ant-form-item-required) {
        color: #ffff;
    }
}

</style>