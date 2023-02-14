<script lang='ts' setup='setup'>
import Message from '@/common/message';
import { FileUploadRequest } from '@/service/module/fileUploadHttp';
import { FormRules } from '@/common/formRules';
import { reactive } from 'vue';
import { AddArticleField } from '@/common/constant';
import { CategoryApi } from '../../service/module/categoryHttp';
import { RESP_CODE } from '../../common/httpStatusCode';
import { FormInstance, UploadFile, UploadFiles, UploadRawFile } from 'element-plus';
import { translate } from '@/assets/i18n/index';
const props = defineProps<{
    close: (msg?: any) => void;
    params: any;
}>();
const fileUploadRequest = new FileUploadRequest();
const categoryApi = new CategoryApi();
// 表单数据
const formState: AddArticleField = reactive(new AddArticleField());
// 封面url(先单独上传图片)
let imageUrl = ref<string>('');
// 是否展示loading
let showLoading = ref<boolean>(false);
// form表单实例
const formRef = ref<FormInstance | undefined>();
// 文件上传路径
const uploadPath = import.meta.env.VITE_API_URL + fileUploadRequest.FILE_UPLOAD;
// 文章分类选项
let articleCategoryOptions = ref<Array<{categoryName: string, _id: string}>>([]);
// 文章标签选项
const tagOptions: any = [];


onMounted(() => {
    getCategoryList();
})

// 提交回调
function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    // 表单校验
}

// 文件处理
function getBase64(img: any, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

// 上传文件状态改变
function handleChangeUploadStatus(uploadFile: UploadFile, uploadFiles: UploadFiles) {
    // if (uploadFile.file.status === 'uploading') {
    //     showLoading.value = true;
    //     return;
    // }
    // if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, (base64Url: string) => {
    //         imageUrl.value = base64Url;
    //         showLoading.value = false;
    //     });
    // }
    // if (info.file.status === 'error') {
    //     showLoading.value = false;
    //     Message({ tipType: 'error', content: 'upload error' });
    // }
}

//上传文件之前的钩子
function beforeAvatarUpload(file: UploadRawFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        Message({ tipType: 'error', content: 'You can only upload JPG file!' });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        Message({ tipType: 'error', content: 'Image must smaller than 2MB!' });
    }
    return isJpgOrPng && isLt2M;
};

// 查询文章分类
function getCategoryList(): void {
    const params = { pageNo: 1, pageSize: 10 }
    categoryApi.getCategoryList(params).then(resp => {
        if (resp.error_code === RESP_CODE.OK_CODE) {
            articleCategoryOptions.value = resp.categoryList;
        }
    })
}

</script>

<template>
    <div class="article-layout">
        <el-form :model="formState" ref="formRef" :rules="FormRules.ADD_ARTICEL_RULES">
            <!-- 文章标题 -->
            <el-form-item label="文章标题" prop="title">
                <el-input v-model:value="formState.title" placeholder="please input article title" />
            </el-form-item>
            <!-- 文章分类 -->
            <el-form-item label="文章分类" prop="category">
                <el-select v-model:value="formState.category" placeholder="please selcet article tag">
                    <el-option v-for="item in articleCategoryOptions" :label="item.categoryName" :value="item._id" :key="item._id"/>
                </el-select>
            </el-form-item>
            <!-- 文章标签 -->
            <el-form-item label="文章标签" prop="tag">
                <el-select v-model:value="formState.tag" placeholder="please selcet article category">
                    <el-option v-for="item in tagOptions" :label="item.categoryName" :value="item._id" :key="item._id"/>
                </el-select>
            </el-form-item>
            <!-- 文章描述 -->
            <el-form-item label="文章描述" prop="desc">
                <el-input v-model:value="formState.desc" type="textarea" placeholder="please input article description"/>
            </el-form-item>
            <!-- 文章封面 -->
            <el-form-item label="文章封面" prop="cover">
                <el-upload v-model:file-list="formState.fileList" name="avatar" :limit="1"
                    class="avatar-uploader" :show-file-list="false" :action="uploadPath"
                    :before-upload="beforeAvatarUpload"
                    :on-change="handleChangeUploadStatus">
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="imgBackground" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <!-- 提交 -->
            <el-form-item :wrapper-col="{ span: 14, offset: 10 }">
                <el-button type="primary" html-type="submit" @click="submitForm(formRef)">{{translate('common.submit')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang='less' scoped>
.imgBackground {
    width: 100%;
    height: 100%;
}
</style>