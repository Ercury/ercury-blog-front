import { MessageHandler } from "element-plus";

class Message {

    private messageInstance: MessageHandler;

    constructor() { }

    public success(content: string) {
        this.close();
        this.messageInstance = ElMessage({ message: content, type: 'success' });
    }
    public error(content: string) {
        this.close();
        this.messageInstance = ElMessage({ message: content, type: 'error' });
    }
    public warn(content: string) {
        this.close();
        this.messageInstance = ElMessage({ message: content, type: 'warning' });
    }

    private close(): void {
        if (this.messageInstance) this.messageInstance.close();
    }
}
export const message = new Message();

