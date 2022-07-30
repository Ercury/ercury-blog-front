export const menuList = [
    {
        icon: "DashboardOutlined",
        index: "/dashboard",
        title: "menu.dashboard",
    },
    {
        icon: "UserOutlined",
        index: "/user",
        title: "menu.user_manage",
    },
    {
        icon: "FileMarkdownOutlined",
        index: "/article",
        title: "menu.article",
        subs: [
            {
                index: "/",
                title: "menu.article_list"
            },
            {
                index: '/',
                title: "menu.write_article"
            }
        ]
    },
    {
        icon: "TagsOutlined",
        index: "/category_manage",
        title: "menu.category_manage",
        subs: [
            {
                index: "/category_manage",
                title: "menu.category_mange"
            },
            {
                index: "/tags_mange",
                title: "menu.tags_mange"
            }
        ]
    },
    {
        icon: "MessageOutlined",
        index: "/leave_word",
        title: "menu.leave_word_manage",
    },
    {
        icon: "WarningOutlined",
        index: "/error",
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
            {
                index: "/403",
                title: "menu.403page",
            },
        ],
    },
    {
        icon: "MailOutlined",
        index: "/donate",
        title: "menu.supportauthor",
    },
];