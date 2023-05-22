import { GetListField } from "@/common/constant";
import _http from "../requests";

export class TagApi {
  // 查询标签列表
  private GET_TAG_LIST = '/tag/queryTag';
  // 新增标签
  private ADD_TAG = 'tag/createTag';
  // 删除标签
  private DELETE_TAG = 'tag/deleteTag';
  // 更新标签
  private UPDATE_TAG = 'tag/updateTag';

  // 分页查询分类列表
  public getTagList(params: GetListField): Promise<any> {
    return _http({
      url: this.GET_TAG_LIST,
      method: 'GET',
      params
    })
  }

  // 新增标签
  public addTag(params: any): Promise<any> {
    return _http({
      url: this.ADD_TAG,
      method: "POST",
      data: params
    })
  
  }
  // 删除标签
  public deleteTag(param: string): Promise<any> {
    return _http({
      url: `${this.DELETE_TAG}/${param}`,
      method: "DELETE"
    })
  }

  // 更新标签
  public updateTag(params: any): Promise<any> {
    return _http({
      url: this.UPDATE_TAG,
      method: "PUT",
      params
    })
  }
}

export const tagApi = new TagApi();