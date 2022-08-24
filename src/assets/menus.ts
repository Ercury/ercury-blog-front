export interface SidebarMenus {
    icon?: string;
    routeName: string;
    title: string;
    subs?: Array<SidebarMenus>;
}

export const menuList: Array<SidebarMenus> = [
    {
        icon: "DashboardOutlined",
        routeName: "dashboard",
        title: "menu.dashboard",
    },
    {
        icon: "UserOutlined",
        routeName: "user",
        title: "menu.user_manage",
    },
    {
        icon: "FileMarkdownOutlined",
        routeName: "",
        title: "menu.article",
        subs: [
            {
                routeName: "articleList",
                title: "menu.article_list"
            },
            {
                routeName: 'articleWrite',
                title: "menu.article_write"
            }
        ]
    },
    {
        icon: "TagsOutlined",
        routeName: "",
        title: "menu.category_manage",
        subs: [
            {
                routeName: "categoryManage",
                title: "menu.category_manage"
            },
            {
                routeName: "tagsManage",
                title: "menu.tags_manage"
            }
        ]
    },
    {
        icon: "MessageOutlined",
        routeName: "message",
        title: "menu.leave_word_manage",
    },
    {
        icon: "WarningOutlined",
        routeName: "",
        title: "menu.error_page",
        subs: [
            {
                routeName: "403",
                title: "menu.403page",
            },
            {
                routeName: "404",
                title: "menu.404page",
            },
        ],
    },
    {
        icon: "IdcardOutlined",
        routeName: "permissionSetting",
        title: "menu.permission_setting"
    },
    {
        icon: "SettingOutlined",
        routeName: "Systemsetting",
        title: "menu.system_manage",
    },
];