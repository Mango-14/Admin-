<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="19">
        <el-row :gutter="20">
          <el-col :span="1">
            <el-icon @click="Menus.isCollapse = !Menus.isCollapse"
              ><Menu
            /></el-icon>
          </el-col>
          <el-col :span="23">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }" key="/home">{{
                $t("menus.home")
              }}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="item in matched"
                :key="item.path"
                :to="{ path: item.path }"
              >
                {{ $t(item.meta.title as string) }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-dropdown>
              <el-icon><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu @click="changeLang">
                  <el-dropdown-item :disabled="i18n.locale.value == 'zh'"
                    >中文</el-dropdown-item
                  >
                  <el-dropdown-item :disabled="i18n.locale.value == 'en'"
                    >English</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="10">
            <span>{{ User.userInfo.nickname }}</span>
          </el-col>
          <el-col :span="8">
            <el-dropdown>
              <span>
                <div>
                  <el-avatar :src="User.userInfo.user_pic" />
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="gotoCenter"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item @click="outLogin"
                    >退出登陆</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <hr />
  <div class="bottom">
    <Tabs></Tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useMenusStore } from "@/stores/menus";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Tabs from "./Tabs/index.vue";
const i18n = useI18n();

const User = useUserStore();
const Menus = useMenusStore();
const router = useRouter();
const route = useRoute();

const gotoCenter = () => {
  router.push("/userinfo");
};

const outLogin = () => {
  localStorage.removeItem("token");
  ElMessage.success("退出登陆成功");
  router.push("/login");
};

const changeLang = () => {
  i18n.locale.value = i18n.locale.value == "zh" ? "en" : "zh";
};
const matched = computed(() =>
  route.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.title !== "menus.home"
  )
);
</script>

<style lang="less" scoped>
.top {
  height: 60px;
  overflow: hidden;
  :deep(.el-breadcrumb) {
    margin-top: 27px;
  }
  .el-col {
    text-align: center;
    line-height: 55px;
    font-size: 26px;
    span {
      font-size: 16px;
    }

    .el-avatar {
      margin-top: 6px;
    }
    :deep(.el-icon) {
      margin-top: 23px;
    }
  }
}
</style>
