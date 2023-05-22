import { GetListField } from "@/common/constant";
import _http from "../requests";

export class CategoryApi {
  // 查询分类列表
  private GET_CATEGORY_LIST = '/category/queryCategory';
  // 添加分类
  private ADD_CATEGORY = '/category/createCategory';
  // 更新分类
  private UPDATE_CATEGORY = '/category/updateCategory';
  // 删除分类
  private DELETE_CATEGORY = '/category/deleteCategory';

  // 分页查询分类列表
  public getCategoryList(params: GetListField): Promise<any> {
    return _http({
      url: this.GET_CATEGORY_LIST,
      method: 'GET',
      params
    })
  }

  // 添加分类
  public addCategory(params: any): Promise<any> {
    return _http({
      url: this.ADD_CATEGORY,
      method: 'POST',
      data: params
    })
  }

  // 更新分类
  public updateCategory(params: any): Promise<any> {
    return _http({
      url: this.UPDATE_CATEGORY,
      method: 'PUT',
      params
    })
  }

  // 删除分类
  public deleteCategory(params: string): Promise<any> {
    return _http({
      url: `${this.DELETE_CATEGORY}/${params}`,
      method: "DELETE"
    })
  }
}

export const categoryApi = new CategoryApi();