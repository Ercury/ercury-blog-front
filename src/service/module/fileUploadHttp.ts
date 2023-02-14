import _http from '@/service/requests';
export class FileUploadRequest {
  // 文件上传
  public FILE_UPLOAD = '/fileUpload';

  // 文件上传请求函数
  public fileUpload = (params: any): Promise<any> => {
    return _http({
      url:  this.FILE_UPLOAD,
      method: 'POST',
      params
    })
  }
}