<script lang='ts' setup='setup'>
import { useSidebarStore } from '@/store/module/userSidebarStore';
import AppIcon from '@/components/AppIcon.vue';
import { ComponentInternalInstance, getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const sidebar = useSidebarStore();
const collapseChage = () => {
    sidebar.handlecollapse();
}
</script>
<template>
    <div class="layout-header">
        <div class="header-left">
            <!-- 折叠按钮 -->
            <div class="collapse-btn" @click="collapseChage">
                <app-icon v-show="!sidebar.collapse" icon="ant-design:menu-fold-outlined" style="font-size:x-large;">
                </app-icon>
                <app-icon v-show="sidebar.collapse" icon="ant-design:menu-unfold-outlined" style="font-size:x-large;">
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
                <app-icon icon="bx:bell" style="font-size:25px;position:absolute;top: 4px;"></app-icon>
                <span class="btn-bell-badge"></span>
            </div>
            <!-- 头像 -->
            <div class="avatar">
                <a-dropdown>
                    <a-avatar size="large">
                        <template #icon>
                            <component class="icon" :is="appContext?.config.globalProperties.$antIcons['UserOutlined']" />
                        </template>
                    </a-avatar>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">2nd menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">3rd menu item</a>
                            </a-menu-item>
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
                                <a href="javascript:;">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">2nd menu item</a>
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
        }

        .header-logo {
            // width: calc(200px - 66px);
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

        .avatar {}

        .language {
            
        }
    }
}
</style>