<script lang='ts' setup='setup'>
import { reactive, ref } from 'vue';
import { LoginFormField } from '@/common/constant';
import { FormRules } from '@/common/formRules';
import { UserRequests } from "@/service/module/userHttp";
import { RESP_CODE } from "@/common/httpStatusCode";
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
import { useUserStore } from '@/store/module/useUserStore';
import { usePermissionStore } from '@/store/module/usePermissionStore';
import { message } from '@/common/message';
import { translate } from '@/assets/i18n';
const formState: LoginFormField = reactive(new LoginFormField());
const userRequests = new UserRequests();
const userStore = useUserStore();
const permissionStore = usePermissionStore();
const router = useRouter();
const formRef = ref<FormInstance | undefined>();

// 提交回调
function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    // 表单校验
    formEl.validate((valid) => {
        if (valid) {
            queryLogin(formState);
        }
    })
}

// 登录接口
const queryLogin = (params: LoginFormField): void => {
    userRequests.reqLogin(params).then(async resp => {
        const { data, code } = resp;
        if (code === RESP_CODE.SUCCESS_CODE) {
            message.success('登录成功');
            userStore.setLogin(Object.assign({}, data, { token: resp.token }));
            await permissionStore.handleRoutes().then(() => {
                router.push({ name: 'Dashboard' });
            });
        }
    }).catch(err => {
        message.error(err.msg);
    })
}
</script>

<template>
    <div class="background-login">
        <div class="login-form">
            <el-form :model="formState" name="basic" label-width="120px" @submit.native.prevent
                class="label-color demo-dynamic" autocomplete="off" ref="formRef" :rules="FormRules.LOGIN_FORM_RULES">
                <!-- username -->
                <el-form-item :label="translate('form.login.user_name')" prop="username">
                    <el-input type="text" v-model="formState.username" />
                </el-form-item>
                <!-- password -->
                <el-form-item :label="translate('form.login.password')" prop="password">
                    <el-input type="password" v-model="formState.password" />
                </el-form-item>
                <!-- remember -->
                <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">{{translate('form.login.remember_me')}}</a-checkbox>
                </a-form-item> -->
                <el-form-item>
                    <el-button class="submit-btn" type="primary" native-type="submit" @click="submitForm(formRef)">{{
                        translate('common.submit') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang='less' scoped>
.background-login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(@/assets/images/02.jpg) no-repeat left center / cover;

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;

        .submit-btn {
            margin-left: 100px;
        }

    }
}
</style>