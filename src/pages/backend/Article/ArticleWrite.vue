<template>
  <div class="article-write">
    <div class="write-header">
      <el-input v-model="articleState.title" placeholder="请输入文章标题..." class="title-input"></el-input>
      <div class="btn-box">
        <el-button round @click="pushStart(true)">导入文章发布</el-button>
        <el-button round @click="pushStart(false)">发布</el-button>
      </div>
      <el-drawer ref="popoverRef" v-model="state.formDrawer">
        <h3>发布文章</h3>
        <el-form label-width="80px" class="form-style">
          <el-form-item label="文章分类">
            <!-- 文章分类 -->
            <el-select v-model="articleState.category" class="item-width" placeholder="please selcet article category"
              :teleported="false">
              <el-option v-for="category in state.articleCategoryOptions" :key="category.value" :value="category.value"
                :label="category.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章标签">
            <!-- 文章标签 -->
            <el-select v-model="articleState.tags" class="item-width" :validate-event="false" multiple :teleported="false"
              placeholder="please selcet article tag">
              <el-option v-for="tag in state.articleTagOptions" :label="tag.label" :value="tag.value" :key="tag.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面">
            <!-- 文章封面 -->
            <el-upload accept=".png,.jpeg" name="cover" :show-upload-list="false" class="avatar-uploader"
              :http-request="uploadFile" :on-preview="handlePreview" :on-remove="handleRemove">
              <img v-if="state.imagePreviewUrl" :src="state.imagePreviewUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <!-- 文章 -->
          <el-form-item v-if="!state.isWrite">
            <el-upload class="upload-md" drag accept=".md" :http-request="uploadFile" name="md">
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
      </el-drawer>
    </div>
    <markdown ref="markdowRef" mode="editor"></markdown>
  </div>
</template>

<script lang='ts' setup='setup'>
import { message } from '@/common/message';
import { articleApi } from '@/service/module/articleHttp';
import { categoryApi } from '@/service/module/categoryHttp';
import { fileUploadApi } from '@/service/module/fileUploadHttp';
import { tagApi } from '@/service/module/tagHttp';
import { UploadFile, UploadRequestOptions } from 'element-plus';
import { RESP_CODE } from '@/common/httpStatusCode';
import _ from 'lodash';
import { blobToString, fileToBlob, fileToFormData, fileToUrl, getFileName } from '@/utils';

// 路由
const router = useRouter();
// popover实例
const popoverRef = ref();
// markdown实例
const markdowRef = ref();
const state = reactive({
  // 抽屉开关
  formDrawer: false,
  // 是否是写文章
  isWrite: true,
  // 文章转换状态
  mdToString: false,
  // 文章封面预览url
  imagePreviewUrl: '',
  // 文章分类选项
  articleCategoryOptions: <Array<{ label: string, value: string }>>[],
  // 文章标签选项
  articleTagOptions: <Array<{ label: string, value: string }>>[]
})

// 文章信息表单数据
const articleState = reactive({
  title: '', // 文章标题
  markDownContent: '', // 文章内容
  category: '', // 文章分类
  tags: [], // 文章标签
  coverUrl: '', // 文章封面url
  createTime: new Date(), // 文章创建时间
  status: 0, // 文章状态
})

// 开始发布
const pushStart = (btnType: Boolean): void => {
  // 打开抽屉
  state.formDrawer = true;
  if (!state.articleCategoryOptions.length || !state.articleTagOptions.length) {
    getCategory();
    getTag();
  }
  state.isWrite = !btnType;
}

const handlePreview = (file: UploadFile): void => {

}

// 删除已上传封面
const handleRemove = (file: UploadFile): void => {
  // 用户删除也上传封面,清除文章封面preview
  state.imagePreviewUrl = '';
}

// 取消
const cancel = (): void => {
  state.formDrawer = false;
}
// 确认发布
const confirm = (): void => {
  if (!state.mdToString) articleState.markDownContent = markdowRef.value.getContent();
  // 发布校验
  if (verify(articleState)) {
    articleApi.addArticle(toRaw(articleState)).then(resp => {
      if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
        message.success('新增成功');
        Object.assign(articleState, null);
        state.formDrawer = false;
        router.push({ name: 'articleList' });
      }
    })
  }
}

function verify(data: any): any {
  if (!state.isWrite && !state.mdToString) {
    message.warn('请上传文章');
    return false;
  }
  if (!data.title) {
    message.warn('标题不能为空');
    return false;
  }
  if (!data.markDownContent) {
    message.warn('内容不能为空');
  }
  if (!data.category) {
    message.warn('请选择一个分类');
    return false;
  }
  if (!data.tags.length) {
    message.warn('请选择文章标签');
    return false;
  }
  if (data.markDownContent.length < 50) {
    message.warn('文章不满足最低50字的要求');
    return false;
  }
  return true;
}

// 获取文章分类
function getCategory(): void {
  categoryApi.getCategoryList({ pageNo: 1, pageSize: 99 }).then(resp => {
    if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
      resp.dataList.forEach((category: { categoryName: string, _id: string }) => {
        state.articleCategoryOptions.push({ label: category.categoryName, value: category._id });
      });
    }
  })
}

// 获取文章标签
function getTag(): void {
  tagApi.getTagList({ pageNo: 1, pageSize: 99 }).then(resp => {
    resp.tagList.forEach((tag: { tagName: string, _id: string }) => {
      state.articleTagOptions.push({ label: tag.tagName, value: tag._id })
    });
  })
}


/**
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
      state.mdToString = true;
    } catch (error) {
      // md转换失败
      state.mdToString = false;
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
    state.imagePreviewUrl = await fileToUrl(file);
  }
  message.success(`${uploadResp.filename}上传成功`);
}

// 文件上传失败
function uploadError(type: string): void {

}



</script>

<style lang='css' scoped>
.write-header {
  display: flex;
  justify-content: space-between;
}

.write-header .title-input :deep(.el-input__wrapper) {
  width: 70%;
  height: 50px;
  background-color: var(--dark-theme);
  box-shadow: 0 0 0 0;
  font-size: 20px;
}

.form-style {
  margin-top: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon .avatar-uploader-icon {
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
}

.btn-box :deep(.el-button) {
  background-color: var(--color-button-default);
}

.upload-md {
  width: 90%;
}
</style>
