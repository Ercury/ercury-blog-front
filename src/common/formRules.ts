import { translate } from "@/assets/i18n/index"
// FormRules
export class FormRules {
    // 用户登录表单校验
    static LOGIN_FORM_RULES: { [key: string]: Object } = {
        username: [
            {
                required: true,
                message: translate('tips.valid_username_notnull'),
                trigger: ['change']
            }
        ],
        password: [
            {
                required: true,
                message: translate('tips.valid_password_notnull'),
                trigger: ['change']
            }
        ]

    }

    // 新增文章表单校验
    static ADD_ARTICEL_RULES: { [key: string]: Object } = {
        title: [
            {
                required: true,
                message: translate('tips.valid_articletitle'),
                trigger: ['change']
            }
        ],
        category: [
            {
                required: true,
                message: '文章分类不能为空',
                trigger: ['change']
            }
        ],
        tags: [
            {
                required: true,
                message: '文章标签不能为空',
                trigger: ['change']
            }
        ],
        cover: [
            {
                required: false,
                message: '文章封面不能为空',
                trigger: ['change']
            }
        ],
        mdFilename: [
            {
                required: false,
                message: '文章不能为空',
                trigger: ['change']
            }
        ]
    }
}