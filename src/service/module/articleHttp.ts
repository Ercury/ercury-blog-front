import { GeListField } from "@/common/constant";
import _http from "../requests";

export class ArticleRequest {
    // 查询文章列表
    private GET_ARTICLE_LIST = '/article/articleList';

    // 分页查询文章列表
    public getArticleList = (params: GeListField): Promise<any> => {
        return _http({
            url: this.GET_ARTICLE_LIST,
            method: 'GET',
            params: params
        })
    }
    
}