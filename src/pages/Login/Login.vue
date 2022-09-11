<script lang='ts' setup='setup'>
import { reactive, ref } from 'vue';
import { LoginFormField } from '@/common/constant';
import { FormRules } from '@/common/formRules';
import { UserRequests } from "@/service/module/userHttp";
import { RESP_CODE } from "@/common/httpStatusCode";
import { useRouter } from 'vue-router';
import type { FormInstance } from 'ant-design-vue';
import useUserStore from '@/store/module/useUserStore';
import Message from '@/common/message';
const formState: LoginFormField = reactive(new LoginFormField());
const userRequests = new UserRequests();
const user = useUserStore();
const router = useRouter();
const formRef = ref<FormInstance | undefined>();

// 表单校验成功
const onFinish = (): void => {
    queryLogin(formState);
}

// 登录接口
const queryLogin = (params: LoginFormField): void => {
    userRequests.reqLogin(params).then(resp => {
        const { data, code } = resp;
        if (code === RESP_CODE.OK_CODE) {
            Message({ tipType: 'success', content: '登录成功' });
            user.setLogin(Object.assign({}, data, { token: resp.token }));
            router.push({ name: 'Home' });
        }
    }).catch(err => {
        Message({ tipType: 'error', content: err.msg });
    })
}
</script>

<template>
    <div class="background-login">
        <div class="login-form">
            <a-form :model="formState"
                    name="basic" 
                    :labelCol="{ span: 5, pull: 2 }" 
                    :wrapperCol="{ span: 16 }"
                    class="label-color" 
                    autocomplete="off" 
                    ref="formRef" 
                    @finish="onFinish">
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
                <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">{{$t('form.login.remember_me')}}</a-checkbox>
                </a-form-item> -->
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