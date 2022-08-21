<template>
  <el-menu
    router
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="route.path"
    text-color="#fff"
    :collapse="Menus.isCollapse"
  >
    <div class="logo">
      <img src="@/assets/logo.png" class="logo" />
    </div>
    <SubItem :menuList="list"></SubItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import SubItem from "./SubItem/index.vue";
import { useMenusStore } from "@/stores/menus";

const router = useRouter();
const route = useRoute();
const Menus = useMenusStore();

const list = router.getRoutes().filter((item) => item.meta.show);
</script>

<style lang="less">
.logo {
  height: 80px;
  background-color: rgb(28, 27, 27);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid;
  img {
    width: 60px;
    height: 60px;
  }
}
.el-menu--vertical {
  height: 100%;
}
ul {
  --el-menu-bg-color: rgb(28, 27, 27) !important;
  .el-sub-menu__title {
    background-color: rgb(28, 27, 27) !important;
  }
}
</style>
