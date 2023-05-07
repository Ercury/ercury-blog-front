import MyDialog from '../components/BaseDialog.vue';
import * as vue from "vue";
// 加载dialog样式
// import '@/assets/style/dialog.less';

interface ModalOptions {
    title?: string;
}

export class ModalService {
    // VNODE
    public vNode: vue.VNode;
    // 挂载所需元素
    public modalElement: Element | ShadowRoot;
    /**
     * 创建一个弹出框
     * @param component 组件
     * @param modalOptions 配置
     */
    public open(component: any, modalOptions?: ModalOptions) {
        // modal组件默认配置
        const dialogProps = {
            modalValue: true,
            showClose: true,
            destroyOnClose: false,
            modal: true,
            center: true,
            onClosed: this.close,
        }

        this.vNode = h(MyDialog, dialogProps, {
            // 向组件传递子元素(传递插槽)
            default: () => h(component, {
                onDismiss: () => {
                    vue.render(null, document.body);
                },
                onClose(event: boolean) {

                }
            }),
            header: () => h('span', { style: { fontSize: '20px' } }, modalOptions?.title)
        }
        );
        // 渲染vnode
        vue.render(this.vNode, document.body);
    }

    // dialog关闭回调
    private close(): void {
        vue.render(null, document.body);
    }
}

const modalService = new ModalService();
export const useDialog = () => {
    return {
        open: modalService.open.bind(modalService),
    };
};

