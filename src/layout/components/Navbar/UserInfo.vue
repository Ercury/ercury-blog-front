<template>
    <div class="header-right">
        <!-- 头像 -->
        <div class="avatar" @mouseenter="state.dropdownShow = true" @mouseleave="state.dropdownShow = false">
            <!-- <el-avatar size="large" src="https://img.paulzzh.com/touhou/random">
                <template #icon>
                    <component class="icon" :is="appContext?.config.globalProperties.$elIcons['UserFilled']" />
                </template>
            </el-avatar> -->
            <Transition name="slide-fade">
                <span class="avatar-circle" v-show="!state.dropdownShow">
                    <img src="https://img.paulzzh.com/touhou/random">
                </span>
            </Transition>
            <!-- <el-dropdown ref="dropDown" trigger="hover" @command="handleCommand">
                <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="modifyPwd">{{ translate('header.modify_pwd') }}</el-dropdown-item>
                            <el-dropdown-item command="logout">{{ translate('header.logout') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown> -->
            <Transition name="slide-fade">
                <div class="dropdown" v-if="state.dropdownShow">
                    <div class="cover">
                        <img src="https://img.paulzzh.com/touhou/random">
                    </div>
                </div>
            </Transition>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
            <icon icon="bx:bell" class="bell-style"></icon>
            <span class="btn-bell-badge"></span>
        </div>
        <!-- 语言 -->
        <div class="language">
            <el-switch v-model="languageToggle" inline-prompt active-text="中文" inactive-text="中文" @change='changeLocale' />
        </div>
        <!-- 主题 -->
        <div :class="[themeToggle ? 'theme-moon' : 'theme-sun']">
            <el-switch v-model="themeToggle" inline-prompt style="--el-switch-on-color:#272727;" @change='changeTheme' />
        </div>
    </div>
</template>

<script lang='ts' setup='setup'>
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, Ref, ref } from "vue";
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
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const languageToggle = ref(true);
const themeToggle = ref(false);

const state = reactive({
    dropdownShow: false
})

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

// 切换主题
const changeTheme = (check: boolean): void => {
    themeToggle.value = check
}

// 下拉选中回调
const handleCommand = (command: string | number | object) => {
    switch (command) {
        case 'logout':
            router.push({ name: 'Login' });
            message.success('退出成功');
            userStore.logout();
            break;
        case 'modifyPwd':
            break;
        default:
            break;
    }
}

</script>


<style lang='less' scoped>
.header-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 280px;
    height: inherit;

    .theme-sun {
        :deep(.el-switch__core) {
            .el-switch__action {
                background-image: url('@/assets/images/sun.svg');
                background-size: 100% 100%;
                background-color: #ffff;
            }
        }
    }

    .theme-moon {
        :deep(.el-switch__core) {
            .el-switch__action {
                background-image: url('@/assets/images/moon.svg');
                background-size: 100% 100%;
                background-color: @dark-theme;
            }
        }
    }

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

.avatar {
    position: relative;

    .avatar-circle {
        display: inline-flex;
        justify-content: center;
        // align-items: center;
        height: 56px;
        width: 56px;

        // object-fit: cover;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            // transition: all 0.6s;
        }
        
        header-entry-mini {
            animation: 600ms ease 0ms 1 normal both running fadeIn;
            animation: 300ms ease 0ms 1 normal both running fadeOut;
        
        header-entry-avatar {
            animation: 350ms ease 2.48575ms 1 normal both running avatarFadeSmall;
            animation: avatarFadeLarge .35s both;
        }

    }

}

@keyframes avatarFadeLarge {
    0% {
        opacity: 0;
        transform: scale(.4) translateY(-2px) translate(3px)
    }

    30% {
        opacity: 1
    }

    to {
        opacity: 1;
        transform: scale(1) translate(-36px,10px)
    }
}

@keyframes avatarFadeSmall {
    0% {
        transform: scale(1) translate(-36px,10px)
    }

    60% {
        opacity: 1
    }

    to {
        opacity: 0;
        transform: scale(.4) translateY(-2px) translate(3px)
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}
.dropdown {
    position: absolute;
    top: 70px;
    left: -68px;
    width: 200px;
    height: 180px;
    background-color: green;

    .cover {
        position: absolute;
        top: -36px;
        left: 28%;
        width: 40%;
        height: 45%;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}</style>