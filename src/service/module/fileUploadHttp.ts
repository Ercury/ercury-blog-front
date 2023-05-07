import _http from '@/service/requests';
export class FileUploadApi {
  // 文件上传
  public FILE_UPLOAD = '/upload';

  // 文件上传请求函数
  public upload = (params: any): Promise<any> => {
    return _http({
      url:  this.FILE_UPLOAD,
      method: 'POST',
      data: params,
      headers: { 'Content-type': 'multipart/form-data;' }
    })
  }
}