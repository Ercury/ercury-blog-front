import { ElDialog } from "element-plus";
import { render } from "vue";

export class ModalService {

    /**
     * 创建一个弹出框
     * @param component 组件
     * @param opt 配置
     */
    static open(component: any, props: any, modalOptions?: any) {
        const close = () => {
            render(null, container)
            document.body.removeChild(container);
        }

        const dialogProps = {
            modelValue: true,
            title: modalOptions?.title,
            showClose: true,
            // appendToBody: true,
            draggable: modalOptions?.draggable,
            destroyOnClose: false,
            modal: true,
            center: true,
            alignCenter: modalOptions.alignCenter,
            onClosed: close,
        }

        const closeHandler = () => {
            if (vNode.component?.props.modelValue) {
                vNode.component!.props.modelValue = false
            }

        }

        const container = document.createElement('div')
        document.body.appendChild(container)
        var vNode = h(ElDialog, dialogProps, {
            default: () => {
                let type = typeof component;
                if (type == 'string' || type == 'number') {
                    return h('div', component)
                } else {
                    return h(component, {
                        ...props,
                        onClose: closeHandler
                    })
                }
            },
            header: () => {
                if (dialogProps) {
                    let type = typeof dialogProps.title
                    if (type == 'string' || type == 'number') {
                        return h('span', dialogProps.title)
                    }
                    return h(dialogProps.title, null)
                }
            }
        }
        );
        render(vNode, container);
    }
}