<template>
  <template v-for="i in menuList" :key="i.path" :index="i.path">
    <el-sub-menu v-if="i.children?.length > 0" :index="i.path">
      <template #title>
        <el-icon>
          <component :is="i.meta.icon"></component>
        </el-icon>
        <span>{{ $t(i.meta.title) }}</span>
      </template>
      <SubItem :menuList="i.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="i.path">
      <el-icon>
        <component :is="i.meta.icon"></component>
      </el-icon>
      <span>{{ $t(i.meta.title) }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
defineProps<{ menuList: any }>();
</script>

<script lang="ts">
export default {
  name: "SubItem",
};
</script>

<style lang="less" scoped></style>
