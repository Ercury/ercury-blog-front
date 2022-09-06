import i18n from "@/assets/i18n/index"
// FormRules
export class FormRules {
   static loginFormRules = {
        username: [
            {
                required: true,
                message: i18n.global.t('tips.valid_username_notnull'),
                trigger: ['change']
            }
        ],
        password: [
            {
                required: true,
                message: i18n.global.t('tips.valid_password_notnull'),
                trigger: ['change']
            }
        ]

    }
}