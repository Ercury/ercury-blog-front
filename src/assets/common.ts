import { DesktopOutlined, MailOutlined } from "@ant-design/icons-vue";
export const menuList = [
    {
        icon: "DesktopOutlined",
        index: "/dashboard",
        title: "menu.homepage",
    },
    {
        icon: "MailOutlined",
        index: "/table",
        title: "menu.table",
    },
    {
        icon: "MailOutlined",
        index: "/tabs",
        title: "menu.tabs",
    },
    {
        icon: "MailOutlined",
        index: "3",
        title: "menu.formrelated",
        subs: [
            {
                index: "/form",
                title: "menu.baseform",
            },
            {
                index: "/upload",
                title: "menu.upload",
            },
            {
                index: "4",
                title: "menu.level3menu",
                subs: [
                    {
                        index: "/editor",
                        title: "menu.edit",
                    },
                    {
                        index: "/markdown",
                        title: "menu.markdown",
                    },
                ],
            },
        ],
    },
    {
        icon: "MailOutlined",
        index: "/icon",
        title: "menu.diyicon",
    },
    {
        icon: "MailOutlined",
        index: "/charts",
        title: "menu.schart",
    },
    {
        icon: "MailOutlined",
        index: "/i18n",
        title: "menu.internationalization",
    },
    {
        icon: "MailOutlined",
        index: "7",
        title: "menu.errorhandling",
        subs: [
            {
                index: "/permission",
                title: "menu.permissionsetting",
            },
            {
                index: "/404",
                title: "menu.404page",
            },
        ],
    },
    {
        icon: "MailOutlined",
        index: "/donate",
        title: "menu.supportauthor",
    },
];