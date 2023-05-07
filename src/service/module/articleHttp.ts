import { AddArticleField, ArticleListData, GetListField } from "@/common/constant";
import _http from "../requests";

export class ArticleApi {
    // 查询文章列表
    private GET_ARTICLE_LIST = '/article/articleList';
    // 新增文章
    private ADD_ARTICLE = '/article/addArticle';
    // 更新文章
    private UPDATE_ARTICLE = '/article/updateArticle';
    // 删除文章
    private DELETE_ARTICLE = '/article/deleteArticle';
    // 查询文章
    private FIND_ARTICLE = '/article/findArticle';

    // 分页查询文章列表
    public getArticleList = (params: GetListField): Promise<any> => {
        return _http({
            url: this.GET_ARTICLE_LIST,
            method: 'GET',
            params: params
        })
    }

    // 新增文章
    public addArticle = (params: AddArticleField): Promise<any> => {
        return _http({
            url: this.ADD_ARTICLE,
            method: 'POST',
            data: params
        })
    }

    // 更新文章
    public updateArticle = (params: ArticleListData): Promise<any> => {
        return _http({
            url: this.UPDATE_ARTICLE,
            method: 'PUT',
            params: params
        })
    }

    // 删除文章
    public deleteArticle = (param: string): Promise<any> => {
        return _http({
            url: `${this.DELETE_ARTICLE}/${param}`,
            method: 'DELETE',
        })
    }

    // 查询文章
    public findArticle = (param: string): Promise<any> => {
        return _http({
            url: `${this.FIND_ARTICLE}/${param}`,
            method: 'GET'
        })
    }
    
}