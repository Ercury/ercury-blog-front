import { GetListField } from "@/common/constant";
import _http from "../requests";

export class TagApi {
  // 查询分类列表
  private GET_TAG_LIST = '/tag/queryTag';

  // 分页查询分类列表
  public getTagList(params: GetListField): Promise<any> {
    return _http({
      url: this.GET_TAG_LIST,
      method: 'GET',
      params
    })
  }
}