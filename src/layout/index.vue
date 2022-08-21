<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        class="rightAnimate"
        :width="Menus.isCollapse ? '63px' : '200px'"
      >
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <div class="main">
            <router-view v-slot="{ Component, route }">
              <component :is="Component" :key="route.path"></component>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Header from "@/layout/Header/index.vue";
import Aside from "@/layout/Aside/index.vue";
import { useUserStore } from "@/stores/user";
import { useMenusStore } from "@/stores/menus";

const User = useUserStore();
const Menus = useMenusStore();

onMounted(() => {
  User.setUserInfo();
});
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      height: 100px;
      background-color: white;
    }
    .el-aside {
      height: 100%;
    }
    .rightAnimate {
      transition: width 0.5s;
    }
    .el-main {
      background: #eceaea;
      overflow: hidden;
      .main {
        width: 100%;
        min-width: 800px;
        height: 100%;
        max-height: 640px;
        border-radius: 7px;
        box-shadow: 1px 2px 5px black;
        box-sizing: border-box;
        padding: 3%;
        background-color: white;
        overflow-y: scroll;
      }
    }
  }
}
</style>
