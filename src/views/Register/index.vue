<template>
  <el-form
    ref="registerFormRef"
    :model="checkRegisterForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <h1>添加用户</h1>
    <el-form-item label="账号：" prop="username">
      <el-input
        v-model="checkRegisterForm.username"
        type="text"
        autocomplete="off"
        placeholder="请输入账号"
      />
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input
        v-model="checkRegisterForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="校验密码：" prop="checkpwd">
      <el-input
        v-model="checkRegisterForm.checkpwd"
        type="password"
        autocomplete="off"
        placeholder="请再次输入密码"
      />
    </el-form-item>
    <el-form-item label="用户名：" prop="nickname">
      <el-input
        v-model="checkRegisterForm.nickname"
        autocomplete="off"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item label="邮箱：" prop="email">
      <el-input
        v-model="checkRegisterForm.email"
        autocomplete="off"
        placeholder="请输入邮箱"
      />
    </el-form-item>
    <el-form-item class="center">
      <el-button type="primary" @click="submitForm(registerFormRef)"
        >注册</el-button
      >
      <el-button @click="resetForm(registerFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import type { FormInstance } from "element-plus";
import { register } from "@/api/module/login";
import { Data } from "@/types/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const registerFormRef = ref<FormInstance>();
const router = useRouter();
const data = reactive(new Data());
const { registerForm, checkRegisterForm } = toRefs(data);

const checkPass = (rule: any, value: any, callback: any) => {
  if (data.checkRegisterForm.checkpwd === "") {
    callback(new Error("请再次输入密码进行校验"));
  } else if (
    data.checkRegisterForm.checkpwd !== data.checkRegisterForm.password
  ) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const checkEmail = (rule: any, value: any, callback: any) => {
  const regexp =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  const flag = regexp.test(value);
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!flag) {
    callback(new Error("邮箱格式不正确!"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 5,
      max: 16,
      message: "账号长度需要在5-16之间",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "密码长度需要在6-18之间",
      trigger: "blur",
    },
  ],
  checkpwd: [
    {
      required: true,
      validator: checkPass,
      trigger: "blur",
    },
  ],
  nickname: [
    {
      required: true,
      min: 1,
      max: 16,
      message: "用户名长度需要在1-16之间",
      trigger: "blur",
    },
  ],
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
});

const submitForm = (checkRegisterForm: FormInstance | undefined) => {
  if (!checkRegisterForm) return;
  checkRegisterForm.validate(async (valid: boolean) => {
    if (valid) {
      data.registerForm = {
        username: data.checkRegisterForm.username,
        password: data.checkRegisterForm.password,
        nickname: data.checkRegisterForm.nickname,
        email: data.checkRegisterForm.email,
      };
      const result: any = await register(data.registerForm);
      ElMessage.success(result.message);
      resetForm(checkRegisterForm);
    }
  });
};
//清空表单数据
const resetForm = (checkRegisterForm: FormInstance | undefined) => {
  if (!checkRegisterForm) return;
  checkRegisterForm.resetFields();
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
  text-align: center;
  h1 {
    font-size: 30px;
    margin-bottom: 50px;
  }
}
</style>
