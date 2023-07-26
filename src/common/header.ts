export class TableColumns {
    // 文章列表表头
    public static ARTICLE_COLUMNS = [
        {
            title: 'Title',
            key: 'title',
            type: 'text'
        },
        {
            title: 'Category',
            key: 'category',
            type: 'select',
            options: <any>[],
            select: 'categorySelect'
        },
        {
            title: 'Tags',
            key: 'tags',
            type: 'select',
            options: <any>[],
            select: 'tagSelect'
        },
        {
            title: 'Status',
            key: 'status',
            type: 'select',
            options: <any>[],
            select: 'status'
        },
        {
            title: 'createTime',
            key: 'createTime'
        },
        {
            title: 'operation',
            key: 'operation'
        },
    ];

    // 分类表头
    public static CATEGORY_COLUMNS = [
        {
            title: 'Name',
            key: 'categoryName'
        },
        {
            title: 'ID',
            key: '_id'
        },
        {
            title: 'operation',
            key: 'operation'
        }
    ]

    // 标签表头
    public static TAG_COLUMNS = [
        {
            title: 'Name',
            key: 'tagName'
        },
        {
            title: 'ID',
            key: '_id'
        },
        {
            title: 'operation',
            key: 'operation'
        }
    ]

    // 操作按钮
    public static OPERATION_BUTTONS = [
        {label: '编辑', key: 'edit', color: '#626aef', status: 0},
        {label: '删除', key: 'delete', color: '#FF4D00', status: 0},
        {label: '保存', key: 'save', color: '#00BFFF', status: 1},
        {label: '取消', key: 'cancel', color: '', status: 1},
    ]


}

// 文章状态
export const ARTICLE_STATUS = new Map([[0, '草稿'], [1, '已发布']]);