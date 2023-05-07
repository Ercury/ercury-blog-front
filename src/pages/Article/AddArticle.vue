<script lang='ts' setup='setup'>
import Message from '@/common/message';
import { FileUploadApi } from '@/service/module/fileUploadHttp';
import { FormRules } from '@/common/formRules';
import { reactive } from 'vue';
import { ArticleField } from '@/common/constant';
import { CategoryApi } from '@/service/module/categoryHttp';
import { RESP_CODE } from '@/common/httpStatusCode';
import { FormInstance, UploadFile, UploadRequestOptions } from 'element-plus';
import { translate } from '@/assets/i18n/index';
import { Plus, UploadFilled } from '@element-plus/icons-vue';
import { TagApi } from '@/service/module/tagHttp';
import { blobToString, fileToBlob, fileToFormData, fileToUrl } from '@/utils';
import { ArticleApi } from '@/service/module/articleHttp';
import { AddArticleField } from '@/common/constant';

const fileUploadApi = new FileUploadApi();
const categoryApi = new CategoryApi();
const tagAPi = new TagApi();
// 实例化文章请求类
const articleApi = new ArticleApi();
// 表单数据
const formState: ArticleField = reactive(new ArticleField());
// 是否展示loading
let showLoading = ref<boolean>(false);
// form表单实例
const formRef = ref<FormInstance | undefined>();
// 文件上传路径
const uploadPath = import.meta.env.VITE_API_URL + fileUploadApi.FILE_UPLOAD;
// 文章分类选项
const articleCategoryOptions = reactive<Array<{ label: string, value: string }>>([]);
// 文章标签选项
const articleTagOptions = reactive<Array<{ label: string, value: string }>>([]);

const emits = defineEmits(['dismiss', 'close'])

onMounted(() => {
    getCategoryList();
    getTagList();
})


// 查询文章分类
function getCategoryList(): void {
    const params = { pageNo: 1, pageSize: 10 }
    categoryApi.getCategoryList(params).then(resp => {
        if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
            resp.categoryList.forEach((category: {categoryName: string, _id: string}) => {
                articleCategoryOptions.push({label: category.categoryName, value: category._id});
            });
        }
    })
}

// 查询文章标签
function getTagList(): void {
    const params = { pageNo: 1, pageSize: 10 }
    tagAPi.getTagList(params).then(resp => {
        if (resp.error_code === RESP_CODE.SUCCESS_CODE) {
            resp.tagList.forEach((tag: {tagName: string, _id: string}) => {
                articleTagOptions.push({label: tag.tagName, value: tag._id})
            });
        }
    })
}

// 文件上传成功
async function uploadSuccess(type: string, uploadResp: any, file: any): Promise<any> {
    if (type === 'cover') { // 如果上传的是文章封面
        // 封面名称参数赋值
        formState.cover = uploadResp.filename;
        // 封面预览变量赋值
        formState.imageUrl = await fileToUrl(file);
    } else if (type === 'mdFilename') { // 如果上传的是md文章
        //将file转化成Blob对象,便于操作
        const blob = await fileToBlob(file);
        formState.rawContent = await blobToString(blob);
        // formState.fileList[0] = 'done';
        // md文档名称参数赋值
        formState.mdFilename = uploadResp.filename;
    }
    Message({tipType: 'success', content: `${uploadResp.filename}上传成功`});
}

// 文件上传失败
function uploadError(type: string): void {
    if (type === 'mdFilename') {
        formState.mdFilename = '';
      } else if (type === 'cover') {
        showLoading.value = false
      }
}

// 过滤请求字段
function dataProcess(rawData: ArticleField): void {
    console.log(rawData);
    
    const params = new AddArticleField(rawData);
    console.log(params);
    
    articleApi.addArticle(params).then(resp => {
        console.log(resp);
    })
}

//  
const handlePreview = (file: UploadFile): void => {
}

// 删除已上传封面
const handleRemove = (file: UploadFile): void => {
    // 用户删除也上传封面,清除文章封面preview
    formState.imageUrl = '';
}

// 上传文件
const uploadFile = (options: UploadRequestOptions): XMLHttpRequest | Promise<unknown> => {
    // 将文件转换成FormData对象实例
    const formData = fileToFormData(options.file);
    return fileUploadApi.upload(formData).then(resp => {
        uploadSuccess(options.filename, resp, options.file);
    }).catch(err => {
        uploadError(options.filename);
    })
}

// 提交回调
const submit = async (formEl: FormInstance | undefined): Promise<any> => {
    emits('close')
    if (!formEl) return
    // 表单校验
    await formEl.validate((valid, fields) => {
    if (valid) {
        // 数据过滤+发送请求
        dataProcess(toRaw(formState));
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 取消
const dismiss = (): void => {
    emits('dismiss')
}

const tagModuleChange = (val: any): void => {
    console.log(val);
}

</script>

<template>
    <div class="article-layout">
        <el-form :model="formState" ref="formRef" :rules="FormRules.ADD_ARTICEL_RULES" label-position="top">
            <!-- 文章标题 -->
            <el-form-item label="文章标题" prop="title" class="item-width">
                <el-input v-model="formState.title" placeholder="please input article title" />
            </el-form-item>
            <!-- 文章分类 -->
            <el-form-item label="文章分类" prop="category">
                <el-select v-model="formState.category" class="item-width" placeholder="please selcet article category">
                    <el-option v-for="category in articleCategoryOptions" :key="category.value" :value="category.value" :label="category.label"  />
                </el-select>
            </el-form-item>
            <!-- 文章标签 -->
            <el-form-item label="文章标签" prop="tags">
                <el-select v-model="formState.tags" class="item-width" @change="tagModuleChange" :validate-event="false" multiple placeholder="please selcet article tag">
                    <el-option v-for="tag in articleTagOptions" :label="tag.label" :value="tag.value" :key="tag.value" />
                </el-select>
            </el-form-item>
            <!-- 文章封面 -->
            <el-form-item label="文章封面" prop="cover">
                <el-upload accept=".png,.jpeg" name="cover" :show-upload-list="false"
                    class="avatar-uploader" :http-request="uploadFile" :on-preview="handlePreview" :on-remove="handleRemove">
                    <img v-if="formState.imageUrl" :src="formState.imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <!-- 文章 -->
           <el-form-item>
                <el-upload class="upload-md" drag accept=".md"
                    :http-request="uploadFile" name="mdFilename">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div> 
                </el-upload>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" class="btn-submit" html-type="submit" @click="submit(formRef)">{{translate('common.submit') }}</el-button>
                <el-button type="default" class="btn-cancel" @click="dismiss">{{ translate('common.cancel') }}</el-button>
            </div>
        </el-form>
    </div>
</template>

<style lang='less' scoped>
.article-layout {
    // margin: 260px;
}

.btn-box {
    position: relative;
    width: 100%;
    height: 30px;
}

.btn-submit {
    position: absolute;
    left: 37%;
}

.btn-cancel {
    position: absolute;
    right: 37%;
}

.imgBackground {
    width: 100%;
    height: 100%;
}

.upload-md {
    width: 100%;
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
</style>