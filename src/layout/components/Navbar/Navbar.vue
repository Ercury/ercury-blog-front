<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/module/userSidebarStore';
import AppIcon from '@/components/AppIcon.vue';
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import {useUserStore} from '@/store/module/useUserStore';
import Message from '@/common/message';
import { KEY_USERINFO} from '@/store/module/useUserStore';
import  { UserInfo } from '@/common/constant';
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const sidebar = useSidebarStore();

const router = useRouter();

const user = useUserStore();

let userInfo = reactive(new UserInfo());

onMounted(() => {
     userInfo = JSON.parse(sessionStorage.getItem(KEY_USERINFO) as string);
     console.log(userInfo);
})

const collapseChage = () => {
    sidebar.handlecollapse();
}

const handleSelect = (menuItem: any) => {
    console.log(menuItem);
    switch (menuItem.key) {
        case 'logout':
            router.push({ name: 'Login' });
            Message({tipType: 'success', content: '退出成功'});
            user.logout();
            break;
        case 'modifyPwd':
            break;
        default:
            break;
    }

}
</script>
<template>
    <div class="layout-header">
        <div class="header-left">
            <!-- 折叠按钮 -->
            <div class="collapse-btn" @click="collapseChage">
                <app-icon v-show="!sidebar.collapse" icon="ant-design:menu-fold-outlined" class="collapse-btn-size">
                </app-icon>
                <app-icon v-show="sidebar.collapse" icon="ant-design:menu-unfold-outlined" class="collapse-btn-size">
                </app-icon>
            </div>
            <!-- logo  -->
            <div class="header-logo">
                <router-link to=""></router-link>
            </div>
        </div>
        <div class="header-right">
            <!-- 消息中心 -->
            <div class="btn-bell">
                <app-icon icon="bx:bell" class="bell-style"></app-icon>
                <span class="btn-bell-badge"></span>
            </div>
            <!-- 头像 -->
            <div class="avatar">
                <a-dropdown>
                    <a-avatar size="large" src="https://img.paulzzh.com/touhou/random">
                        <template #icon>
                            <component class="icon"
                                :is="appContext?.config.globalProperties.$antIcons['UserOutlined']" />
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
            <!-- 语言 -->
            <div class="language">
                <a-dropdown>
                    <span class="outline">
                        <span>{{$t('header.language')}}</span>
                        <component class="icon" :is="appContext?.config.globalProperties.$antIcons['DownOutlined']" />
                    </span>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                {{$t('header.zh')}}
                            </a-menu-item>
                            <a-menu-item>
                                {{$t('header.en')}}
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.layout-header {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    background-color: gray;

    .header-left {
        display: flex;
        width: 200px;

        .collapse-btn {
            padding: 0 21px;
            cursor: pointer;
            line-height: 70px;

            .collapse-btn-size {
                font-size: 25px;
            }
        }

        .header-logo {
            width: 134px;
            background: url(./logo.png) no-repeat scroll top/cover;
            cursor: pointer;
        }
    }

    .header-right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 180px;
        height: inherit;
        background-color: #9e9e;

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

        // .avatar {}

        // .language {

        // }
    }
}
</style>