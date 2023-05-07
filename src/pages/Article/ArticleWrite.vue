<template>
  <div class="article-write">
    <div class="write-header">
      <el-input v-model="articleState.title" placeholder="请输入文章标题..." class="title-input"></el-input>
      <el-popover ref="popoverRef" placement="top" trigger="click" popper-style="min-height: 300px; min-width: 500px">
        <h3>发布文章</h3>
        <el-form label-width="80px" class="form-style">
          <el-form-item label="文章分类">
            <!-- 文章分类 -->
            <el-select v-model="articleState.category" class="item-width" placeholder="please selcet article category" :teleported="false">
              <el-option v-for="category in articleCategoryOptions" :key="category.value" :value="category.value"
                :label="category.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章标签">
            <!-- 文章标签 -->
            <el-select v-model="articleState.tags" class="item-width" :validate-event="false" multiple :teleported="false"
              placeholder="please selcet article tag">
              <el-option v-for="tag in articleTagOptions" :label="tag.label" :value="tag.value" :key="tag.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面">
            <!-- 文章封面 -->
            <el-upload accept=".png,.jpeg" name="cover" :show-upload-list="false" class="avatar-uploader"
              :http-request="uploadFile" :on-preview="handlePreview" :on-remove="handleRemove">
              <img v-if="imagePreviewUrl" :src="imagePreviewUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
           <!-- 文章 -->
           <el-form-item v-if="!isPush">
                <el-upload class="upload-md" drag accept=".md"
                    :http-request="uploadFile" name="md">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button size="large" text @click="cancel">取消</el-button>
          <el-button size="large" type="primary" @click="confirm">确定并发布</el-button>
        </div>
        <template #reference>
          <div class="btn-box">
            <el-button round @click="pushStart(true)">导入文章发布</el-button>
            <el-button round @click="pushStart(false)">发布</el-button>
          </div>
        </template>
      </el-popover>
    </div>
    <markdown ref="markdowRef" :disabled="!isPush"></markdown>
  </div>
</template>

<script lang='ts' setup='setup'>
import Message from '@/common/message';
import { ArticleApi } from '@/service/module/articleHttp';
import { CategoryApi } from '@/service/module/categoryHttp';
import { FileUploadApi } from '@/service/module/fileUploadHttp';
import { TagApi } from '@/service/module/tagHttp';
import { PopoverInstance, UploadFile, UploadRequestOptions} from 'element-plus';
import { RESP_CODE } from '@/common/httpStatusCode';
import _ from 'lodash';
import { blobToString, fileToBlob, fileToFormData, fileToUrl, getFileName } from '@/utils';

// 文件上传类
const fileUploadApi = new FileUploadApi();
// 分类请求
const categoryApi = new CategoryApi();
/// 标签请求
const tagApi = new TagApi();
// 实例化文章请求类
const articleApi = new ArticleApi();
// 路由
const router = useRouter();
// 文章分类选项
const articleCategoryOptions = reactive<Array<{ label: string, value: string }>>([]);
// 文章标签选项
const articleTagOptions = reactive<Array<{ label: string, value: string }>>([]);
// popover实例
const popoverRef = ref();
// 是否是写文章发布
const isPush = ref(true);
// 文章封面预览url
const imagePreviewUrl = ref<String>('');
// md转换状态
const mdToString = ref<Boolean>();
// markdown实例
const markdowRef = ref();


// 文章信息表单数据
const articleState = reactive({
  title: '', // 文章标题
  markDownContent: '', // 文章内容
  description: '', // 文章摘要
  category: '', // 文章分类
  tags: [], // 文章标签
  coverUrl: '', // 文章封面url
  createTime: new Date(), // 文章创建时间
  status: 0, // 文章状态
})

// 开始发布
const pushStart = (btnType: Boolean): void => {
  if (!articleCategoryOptions.length || !articleTagOptions.length) {
    getCategory();
    getTag();
  }
  isPush.value = !btnType;
}

const handlePreview = (file: UploadFile): void => {

}

// 删除已上传封面
const handleRemove = (file: UploadFile): void => {
  // 用户删除也上传封面,清除文章封面preview
  imagePreviewUrl.value = '';
}

// 取消
const cancel = (): void => {
  popoverRef.value?.hide();
}
// 确认发布
const confirm = (): void => {
  if (!mdToString.value) articleState.markDownContent = markdowRef.value.getContent();
  // 发布校验
  if (verify(articleState)) {
    // 截取文章前50个字符作为默认文章摘要
    articleState.description = articleState.markDownContent.slice(0, 50);
    articleApi.addArticle(toRaw(articleState)).then(resp => {
        if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
          Message({tipType: 'success', content: '新增成功'});
          Object.assign(articleState, null);
          popoverRef.value?.hide();
          router.push({name: 'articleList'});
        }
    })
  }
}

function verify(data: any): any {
  if (!isPush.value && mdToString) {
    Message({tipType: 'warn', content: '请上传文章'});
  }
  if (!data.title) {
    Message({ tipType: 'warn', content: '标题不能为空' });
    return false;
  }
  if (!data.markDownContent) {
    Message({ tipType: 'warn', content: '内容不能为空' });
  }
  if (!data.category) {
    Message({ tipType: 'warn', content: '请选择一个分类' });
    return false;
  }
  if (!data.tags.length) {
    Message({ tipType: 'warn', content: '请选择文章标签' });
    return false;
  }
  if (data.markDownContent.length < 50) {
    Message({ tipType: 'warn', content: '文章不满足最低50字的要求' });
    return false;
  }
  return true;
}

// 获取文章分类
function getCategory(): void {
  categoryApi.getCategoryList({ pageNo: 1, pageSize: 99 }).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      resp.categoryList.forEach((category: { categoryName: string, _id: string }) => {
        articleCategoryOptions.push({ label: category.categoryName, value: category._id });
      });
    }
  })
}

// 获取文章标签
function getTag(): void {
  tagApi.getTagList({ pageNo: 1, pageSize: 99 }).then(resp => {
    resp.tagList.forEach((tag: { tagName: string, _id: string }) => {
      articleTagOptions.push({ label: tag.tagName, value: tag._id })
    });
  })
}


/**
 * @description: md转换 + cover上传
 * @param {*} options
 * @return {*}
 */
const uploadFile = async (options: UploadRequestOptions): Promise<void> => {
  if (options.filename === 'md') {
    try {
      //将file转化成Blob对象,便于操作
      const blob = await fileToBlob(options.file);
      // 将md文件转换成字符串
      articleState.markDownContent = await blobToString(blob);
      articleState.title = getFileName(options.file);
      mdToString.value = true;
    } catch (error) {
      // md转换失败
      mdToString.value = false;
    }
  } else if (options.filename === 'cover') {
    // 将文件转换成FormData对象实例
    const formData = fileToFormData(options.file);
    try {
      const resp = await fileUploadApi.upload(formData);
      uploadSuccess(options.filename, resp, options.file);
    } catch (error) {
      uploadError(options.filename);
    }
  }
}

// 文件上传成功
async function uploadSuccess(type: string, uploadResp: any, file: any): Promise<any> {
  if (type === 'cover') { // 如果上传的是文章封面
      // 封面名称参数赋值
      articleState.coverUrl = uploadResp.path;
      // 封面预览变量赋值
      imagePreviewUrl.value = await fileToUrl(file);
  }
  Message({tipType: 'success', content: `${uploadResp.filename}上传成功`});
}

// 文件上传失败
function uploadError(type: string): void {

}



</script>

<style lang='less' scoped>
.write-header {
  display: flex;
  justify-content: space-between;

  .title-input :deep(.el-input__wrapper) {
    width: 70%;
    height: 50px;
    background-color: @dark-theme;
    box-shadow: 0 0 0 0;
    font-size: 20px;
  }
}

.form-style {
  margin-top: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
}

.item-width {
  width: 300px;
}
.btn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  :deep(.el-button) {
    background-color: @general-button-color;
  }
}
.upload-md {
  width: 90%;
}
</style>
