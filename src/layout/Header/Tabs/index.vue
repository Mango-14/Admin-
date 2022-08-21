<template>
  <div class="tab-box">
    <div class="tab-menus">
      <el-tabs
        v-model="tabsMenuValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ $t(item.title) }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTabsStore } from "@/stores/tab";
import type { TabsPaneContext } from "element-plus";

const tabStore = useTabsStore();
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const tabsMenuValue = computed({
  get: () => {
    return tabStore.tabsMenuValue;
  },
  set: (val) => {
    tabStore.setTabsMenuValue(val);
  },
});

const route = useRoute();
const router = useRouter();
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    let params = {
      title: route.meta.title as string,
      path: route.path,
      close: true,
    };
    tabStore.addTabs(params);
  },
  {
    immediate: true,
  }
);

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string;
  router.push(path);
};

// Remove Tab
const removeTab = (activeTabPath: string) => {
  tabStore.removeTabs(activeTabPath);
};
</script>

<style lang="less" scoped>
.tab-box {
  :deep(.tab-menus) {
    .el-tabs {
      --el-tabs-header-height: 38px;
    }
    .el-tabs--card > .el-tabs__header {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
    }
    .el-tabs__item.is-active {
      color: orange;
      border-bottom: 1px solid orange !important;
      box-sizing: content-box;
    }
  }
}
</style>
