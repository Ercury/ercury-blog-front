<script lang='ts' setup='setup'>
import AppIcon from '@/components/AppIcon.vue';
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, Ref, ref} from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/module/useUserStore';
import Message from '@/common/message';
import { KEY_USERINFO } from '@/store/module/useUserStore';
import { UserInfo } from '@/common/constant';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const languageToggle: Ref<boolean> = ref(true);
const handleSelect = (menuItem: any) => {
    switch (menuItem.key) {
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
let userInfo = reactive(new UserInfo());
onMounted(() => {
    userInfo = JSON.parse(sessionStorage.getItem(KEY_USERINFO) as string);
})

// 切换语言
const changeLocale = (check: boolean): void => {
   if(check) {
    locale.value = 'zh';
   } else {
    locale.value = 'en';
    const body =  document.querySelector('#app');
    console.log(body);
    
    if (body) {
        body.style.backgroundColor = 'black';
    }
   }
   localStorage.setItem('language', locale.value);
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
            <a-switch v-model:checked="languageToggle" checked-children="中文" un-checked-children="英文" @change='changeLocale'/>
        </div>
        <!-- 头像 -->
        <div class="avatar">
            <a-dropdown>
                <a-avatar size="large" src="https://img.paulzzh.com/touhou/random">
                    <template #icon>
                        <component class="icon" :is="appContext?.config.globalProperties.$antIcons['UserOutlined']" />
                    </template>
                </a-avatar>
                <template #overlay>
                    <a-menu @click="handleSelect">
                        <a-menu-item key="modifyPwd">{{$t('header.modify_pwd')}}</a-menu-item>
                        <a-menu-item key="logout">{{$t('header.logout')}}</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
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