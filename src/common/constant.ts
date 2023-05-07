// 登录字段
export class LoginFormField {
    username: string;
    password: string;
}

// 添加文章入参
export class AddArticleField {
    title: String; // 文章标题
    markDownContent: String; // 文章内容
    description: String; // 文章摘要
    category: String; // 文章分类
    tags: Array<any>; // 文章标签
    coverUrl: String; // 文章封面url
    createTime: Date; // 文章创建时间
    status: Number; // 文章状态
}
// 添加文章参数
export class ArticleField extends AddArticleField {
    imageUrl: string;
    rawContent: string;
}


// 用户信息
export class UserInfo {
    username: string;
    email: string;
    role: string;
    avatar: string;
    createTime: Date;
    status: number;
    token: string;
}

// 分页查询列表参数
export class GetListField {
    pageNo: number;
    pageSize: number;
}

// 

// 文章返回字段
export class ArticleListData {
    _id: string;
    title: string;
    category: { catagoryName: string, _id: string};
    tags: Array<{ tagName: string, _id: string}>;
    markDownContent: String;
    coverUrl: String; // 文章封面url
    createTime: Date; // 文章创建时间
    status: Number; // 文章状态
    description: String; // 文章摘要
    isEdit: Boolean; // 是否编辑状态
    disabled: Boolean; // 是否禁用按钮
    categorySelect: String;
    tagSelect:  Array<string>;

    constructor(article: ArticleListData) {
        this.title = article.title;
        this.description = article.description;
        this.status = article.status;
        this.createTime = article.createTime;
        this._id = article._id;
        this.category = article.category;
        this.tags = article.tags;
        this.categorySelect = this.category._id;
        this.tagSelect = this.tags.map(item => item._id);

    }
}

// 分类返回字段
export class CategoryListData {
    categoryName: string;
    _id: string;
}