<template>
  <div class="userCenter">
    <el-page-header title="返回" @back="toHome" />
    <div class="center">
      <div>
        <el-avatar :src="User.userInfo.user_pic" @click="isUpload = true" />
      </div>
      <div>用户名：{{ User.userInfo.nickname }}</div>
      <div>邮箱：{{ User.userInfo.email }}</div>
      <el-button type="primary" @click="isShow = true">修改个人信息</el-button>
      <el-button type="primary" @click="isChange = true">修改密码</el-button>
    </div>
  </div>
  <el-dialog v-model="isShow" title="编辑">
    <el-form :model="updateData">
      <el-form-item label="用户名" label-width="70px">
        <el-input v-model="updateData.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="70px">
        <el-input v-model="updateData.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="sureUpdate">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="isChange" title="修改密码">
    <el-form
      ref="changePwdFormRef"
      :model="updataPwd"
      status-icon
      :rules="rules"
      label-width="50px"
      class="demo-ruleForm"
    >
      <el-form-item prop="oldPwd" label="旧密码" label-width="70px">
        <el-input v-model="updataPwd.oldPwd" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="newPwd" label="新密码" label-width="70px">
        <el-input v-model="updataPwd.newPwd" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isChange = false">取消</el-button>
        <el-button type="primary" @click="changePwd(changePwdFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog class="userpic" v-model="isUpload" title="上传头像">
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:8080/my/uploadimg"
      :data="{ id: User.userInfo.id }"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
    >
      <img
        v-if="User.userInfo.user_pic"
        :src="User.userInfo.user_pic"
        class="avatar"
      />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { Data } from "@/types/user";
import { updateUserInfo, updatePwd } from "@/api/module/userInfo";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

const User = useUserStore();
const data = reactive(new Data());
const { updateData, isShow, isChange, updataPwd, isUpload } = toRefs(data);
const router = useRouter();

const sureUpdate = async () => {
  try {
    data.updateData.id = User.userInfo.id;
    const result: any = await updateUserInfo(data.updateData);
    User.setUserInfo();
    data.isShow = false;
    ElMessage.success(result.message);
  } catch (error) {
    return Promise.reject(error);
  }
};

const toHome = () => {
  router.back();
};

const changePwd = (changePwdFormRef: FormInstance | undefined) => {
  try {
    if (!changePwdFormRef) return;
    changePwdFormRef.validate(async (valid: boolean) => {
      if (valid) {
        data.updataPwd.id = User.userInfo.id;
        const result: any = await updatePwd(data.updataPwd);
        data.isChange = false;
        localStorage.removeItem("token");
        router.push("/login");
        ElMessage.success(result.message);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
const changePwdFormRef = ref<FormInstance>();
const rules = reactive({
  oldPwd: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度需要在6-18之间",
      trigger: "blur",
    },
  ],
  newPwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度需要在6-18之间",
      trigger: "blur",
    },
  ],
});
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  User.setUserInfo();
  ElMessage.success(response.message);
};
</script>

<style lang="less">
.userCenter {
  background-image: url("@/assets/usercenterbg.png");
  background-size: 100%, 100%;
  width: 100%;
  height: 100%;
  .el-page-header {
    background-color: rgba(255, 255, 254, 0);
    border: 1px solid black;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
  }
  .center {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 700px;
    height: 600px;
    background-color: rgba(255, 255, 254, 0);
    border-radius: 20px;
    box-shadow: 1px 2px 10px rgb(0, 0, 0);
    text-align: center;

    .el-avatar {
      margin-top: 30px;
      width: 200px;
      height: 200px;
    }
    div {
      display: block;
      margin-bottom: 40px;
      font-size: 30px;
    }
  }
}

.el-dialog {
  width: 400px;
  text-align: center;
}
.avatar-uploader {
  .el-upload {
    width: 179px;
    height: 179px;
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
</style>
