<script lang='ts' setup='setup'>
import AppIcon from '@/components/AppIcon.vue';
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, Ref, ref } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/module/useUserStore';
import Message from '@/common/message';
import { KEY_USERINFO } from '@/store/module/useUserStore';
import { UserInfo } from '@/common/constant';
import { translate } from "@/assets/i18n/index"
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const languageToggle: Ref<boolean> = ref(true);

// dropdown组件
const dropDown = ref();

let userInfo = reactive(new UserInfo());
onMounted(() => {
    userInfo = JSON.parse(sessionStorage.getItem(KEY_USERINFO) as string);
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

// 下拉选中回调
const handleCommand = (command: string | number | object) => {
    switch (command) {
        case 'logout':
            router.push({ name: 'Login' });
            Message({ tipType: 'success', content: '退出成功' });
            userStore.logout();
            break;
        case 'modifyPwd':
            break;
        default:
            break;
    }
}

</script>

<template>
    <div class="header-right">
        <!-- 消息中心 -->
        <div class="btn-bell">
            <app-icon icon="bx:bell" class="bell-style"></app-icon>
            <span class="btn-bell-badge"></span>
        </div>
        <!-- 语言 -->
        <div class="language">
            <el-switch v-model="languageToggle" inline-prompt active-text="中文" inactive-text="中文"
                @change='changeLocale' />
        </div>
        <!-- 头像 -->
        <div class="avatar">
            <el-dropdown ref="dropDown" trigger="click" @command="handleCommand">
                <el-avatar size="large" src="https://img.paulzzh.com/touhou/random">
                    <template #icon>
                        <component class="icon" :is="appContext?.config.globalProperties.$elIcons['UserFilled']" />
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
    </div>
</template>

<style lang='less' scoped>
.header-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 180px;
    height: inherit;

    .btn-bell {
        position: relative;
        width: 25px;
        height: inherit;
        line-height: 70px;

        .bell-style {
            font-size: 25px;
            position: absolute;
            top: 4px;
        }

        .btn-bell-badge {
            position: absolute;
            top: 14px;
            right: 1px;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: red;
        }
    }
}
</style>