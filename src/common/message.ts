import { ElMessage } from 'element-plus';
const Message =  (config: {tipType: string, content: string}) => {
    ElMessage.closeAll();
   switch (config.tipType) {
       case 'success':
           return ElMessage.success(config.content);
       case 'error':
           return ElMessage.error(config.content);
       case 'info':
           return ElMessage.info(config.content)
        default:
            break;
    }
}

export default Message;
