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
                message: translate('tips.valid_articletitle'),
                trigger: ['change']
            }
        ],
        tag: [
            {
                required: true,
                message: translate('tips.valid_articletitle'),
                trigger: ['change']
            }
        ],
        desc: [
            {
                required: true,
                message: translate('tips.valid_articletitle'),
                trigger: ['change']
            }
        ],
        cover: [
            {
                required: true,
                message: translate('tips.valid_articletitle'),
                trigger: ['change']
            }
        ]
    }
}