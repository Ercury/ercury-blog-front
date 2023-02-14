// 登录字段
export class LoginFormField {
    username: string;
    password: string;
}

// 添加文章入参
export class AddArticleField {
    title: string;
    category: string;
    tag: string;
    desc: string;
    cover: string;
    fileList: [];
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
export class GeListField {
    pageNo: number;
    pageSize: number;
}

// 

// 文章返回字段
export class ArticleListData {
    title: string;
    content: string;
    category: string;
    tag: string;
    createTime: Date;
    modifyTime: Date;
}
