<template>
  <transition appear appear-active-class="animate__animated animate__fadeIn">
    <div class="login-box" v-show="true">
      <transition
        appear
        appear-active-class="animate__animated animate__flipInX"
      >
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          status-icon
          :rules="rules"
          label-width="50px"
          class="demo-ruleForm"
        >
          <h1>后台管理系统</h1>
          <el-form-item label="账号：" prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              autocomplete="off"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              @keyup.enter.native="submitForm(loginFormRef)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(loginFormRef)"
              >登陆</el-button
            >
            <el-button @click="resetForm(loginFormRef)">清空</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import "animate.css";
import { login } from "@/api/module/login";
import type { LoginForm } from "@/types/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const loginFormRef = ref<FormInstance>();
const router = useRouter();
const loginForm: LoginForm = reactive({
  username: "",
  password: "",
});

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
});

const submitForm = (loginFormRef: FormInstance | undefined) => {
  if (!loginFormRef) return;
  loginFormRef.validate(async (valid: boolean) => {
    if (valid) {
      let result: any = await login(loginForm);
      localStorage.setItem("token", result.token);
      ElMessage.success(result.message);
      router.push("/");
    }
  });
};
//清空表单数据
const resetForm = (loginFormRef: FormInstance | undefined) => {
  if (!loginFormRef) return;
  loginFormRef.resetFields();
};
</script>

<style lang="less">
.login-box {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/loginBg.png);
  background-size: 100% 100%;

  .demo-ruleForm {
    position: absolute;
    left: 19%;
    top: 25%;
    //transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.5);
    width: 800px;
    height: 200px;
    margin: 0 auto;
    padding: 40px 50px;
    border-radius: 30px;
    box-shadow: 2px 5px 10px #72a5b6;

    .el-form-item__content {
      justify-content: center;
      margin: 0 !important;
      .el-input__wrapper {
        background: rgba(255, 255, 255, 0.15);
      }
      .el-button--primary {
        background-color: #a5caf1;
      }
    }

    label {
      width: 70px !important;
    }
  }

  h1 {
    padding-bottom: 30px;
    text-align: center;
    color: #606266;
    letter-spacing: 20px;
  }
}
</style>
