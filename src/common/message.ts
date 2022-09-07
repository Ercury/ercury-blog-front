import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
const Message =  (config: {tipType: string, content: string}) => {
    message.destroy();
   switch (config.tipType) {
       case 'success':
           return message.success(config.content);
           break;
       case 'error':
           return message.error(config.content);
           break;
       case 'info':
           return message.info(config.content);
           break;
       case 'warn':
           return message.warn(config.content);
           break;
       case 'loading':
           return message.loading(config.content);
           break;
        default:
            break;
    }
}

export default Message;
