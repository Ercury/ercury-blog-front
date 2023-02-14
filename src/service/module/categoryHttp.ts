import { GeListField } from "@/common/constant";
import _http from "../requests";

export class CategoryApi {
  // 查询分类列表
  private GET_CATEGORY_LIST = '/category/findcategory';

  // 分页查询分类列表
  public getCategoryList(params: GeListField): Promise<any> {
    return _http({
      url: this.GET_CATEGORY_LIST,
      method: 'GET',
      params
    })
  }
}