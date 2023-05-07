import SparkMD5 from 'spark-md5';
// 上传前文件处理
export function fileToFormData(file: File): FormData {
  const formData = new FormData();
  const postfix = fileToPostfix(file);
  const str = file.name + file.lastModified + file.size;
  formData.append('file', file);
  formData.append('postfix', postfix);
  formData.append('hash', stringToHash(str));
  formData.append('filename', file.name);
  return formData;
}

// 获取文件后缀名
export function fileToPostfix(file: File): string {
  return file.name.slice(file.name.lastIndexOf('.') + 1, file.name.length);
}

// 去除文件后缀名
export function getFileName(file: File): string {
  return file.name.substring(0, file.name.lastIndexOf('.'));
}

// String to Hash
export function stringToHash(str: string): string {
  const spark = new SparkMD5();
  spark.append(str);
  return spark.end();
}

// File to Blob
export function fileToBlob(file: File): Promise<any> {
  return new Promise(resolve => {
    const reader = new FileReader();
    // 读取文件之后出发onload事件
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (typeof(e.target?.result) === 'object') {
        resolve(new Blob([e.target.result as BlobPart]));
      } else {
        resolve(e.target?.result);
      }
    }
  })
}

// Blob to String
export function blobToString(blob: Blob): Promise<any> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsText(blob);
    reader.onload = (e) => {
      resolve(reader.result);
    }
  })
}

// File to URL
export function fileToUrl(file: File): Promise<any> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => resolve(e.target?.result);
  })
}