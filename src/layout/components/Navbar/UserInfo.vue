<template>
    <ul class="header-right">
        <!-- 头像 -->
        <li class="header-right-item">
            <div class="avatar">
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-avatar size="default" :src="state.userInfo.avatar">
                        <template #icon>
                            <icon icon="appContext?.config.globalProperties.$elIcons['UserFilled']"></icon>
                        </template>
                    </el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="modifyPwd">{{ translate('header.modify_pwd') }}</el-dropdown-item>
                            <el-dropdown-item command="logout">{{ translate('header.logout') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </li>
        <li class="header-right-item">
            <!-- 消息中心 -->
            <div class="btn-bell">
                <icon icon="bx:bell" class="bell-style"></icon>
                <span class="btn-bell-badge"></span>
            </div>

        </li>
        <!-- 语言 -->
        <li class="header-right-item">
            <el-switch v-model="state.languageToggle" inline-prompt active-text="中文" inactive-text="中文"
                @change='changeLocale' />
        </li>
        <!-- 主题 -->
        <li class="header-right-item">
            <div :class="[state.themeToggle ? 'theme-moon' : 'theme-sun']">
                <el-switch v-model="state.themeToggle" inline-prompt style="--el-switch-on-color:#272727;"
                    @change='changeTheme' />
            </div>
        </li>
    </ul>
</template>

<script lang='ts' setup='setup'>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/module/useUserStore';
import { message } from '@/common/message';
import { KEY_USERINFO } from '@/store/module/useUserStore';
import { UserInfo } from '@/common/constant';
import { translate } from "@/assets/i18n/index"
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const state = reactive({
    userInfo: <UserInfo>{},
    themeToggle: false,
    languageToggle: true,

})

onMounted(() => {
    state.userInfo = JSON.parse(sessionStorage.getItem(KEY_USERINFO) as string);
})

// 切换语言
const changeLocale = (check: string | number | boolean): void => {
    if (check) {
        locale.value = 'zh';
    } else {
        locale.value = 'en';
    }
    localStorage.setItem('language', locale.value);
}

// 切换主题
const changeTheme = (check: string | number | boolean): void => {
    state.themeToggle = check as boolean;
}

// 下拉选中回调
const handleCommand = (command: string | number | object) => {
    switch (command) {
        case 'logout':
            userStore.logout();
            router.push({ name: 'Login' });
            message.success('退出成功');
            break;
        case 'modifyPwd':
            break;
        default:
            break;
    }
}

</script>


<style lang="css" scoped>
.header-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 280px;
    height: inherit;
}

.theme-sun :deep(.el-switch__core) .el-switch__action {
    background-image: url('@/assets/images/sun.svg');
    background-size: 100% 100%;
    background-color: #ffff;
}

.theme-moon :deep(.el-switch__core) .el-switch__action {
    background-image: url('@/assets/images/moon.svg');
    background-size: 100% 100%;
    background-color: var(--dark-theme);
}

.btn-bell {
    position: relative;
    width: 25px;
    height: 32px;
}

.btn-bell-badge {
    position: absolute;
    top: 7px;
    right: 1px;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: red;
}

.bell-style {
    font-size: 25px;
    position: absolute;
    top: 4px;
}
</style>