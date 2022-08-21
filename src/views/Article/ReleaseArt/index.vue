<template>
  <h1>发布文章</h1>
  <div class="from-upload">
    <el-form
      ref="relArtFormRef"
      :inline="true"
      :model="relArticle"
      class="demo-form-inline"
    >
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="relArticle.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章类名:" prop="cate_id">
        <el-select v-model="relArticle.cate_id" placeholder="请选择文章类名">
          <el-option
            :label="cate.name"
            :value="cate.id"
            v-for="cate in cateList"
            :key="cate.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章状态:" prop="state">
        <el-select v-model="relArticle.state" placeholder="请选择文章状态">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="submitUpload">发布文章</el-button>
        <el-button @click="clearFrom(relArtFormRef)">清空内容</el-button>
      </el-form-item>
    </el-form>
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      action="http://127.0.0.1:8080/my/article/add"
      :data="{
        ...relArticle,
        author_id: userInfo.id,
      }"
      :auto-upload="false"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-change="handleAvatarChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="relArticle.content"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useArticleStore } from "@/stores/article";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadInstance } from "element-plus";
import type { FormInstance } from "element-plus";

const article = useArticleStore();
const { cateList, relArticle } = article;
const user = useUserStore();
const { userInfo } = user;
const relArtFormRef = ref<FormInstance>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const imageUrl = ref("");
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  if (response.code == 200) ElMessage.success(response.message);
  else ElMessage.error(response.message);
};
const handleAvatarChange: UploadProps["onChange"] = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
  uploadRef.value!.submit();
};

const clearFrom = (relArtFormRef: FormInstance | undefined) => {
  const editor = editorRef.value;
  editor.clear();
  relArticle.title = "";
  relArticle.state = "";
  relArticle.cate_id = null;
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  margin-bottom: 30px;
}

.from-upload {
  height: 100px;
  position: relative;
  :deep(.avatar-uploader) {
    display: inline-block;
    position: absolute;
    top: -18px;
    left: 1070px;
    .el-upload {
      width: 100px;
      height: 100px;
      border: 1px dashed #545454;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
    .el-upload.el-upload--text:hover {
      border-color: skyblue;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .el-form {
    .button {
      :deep(.el-form-item__content) {
        flex-direction: column;
        justify-content: center;
        .el-button {
          margin-left: 0;
          margin-bottom: 10px;
        }
      }
    }
  }
}

// .el-button {
//   margin: 20px 500px;
// }
</style>
