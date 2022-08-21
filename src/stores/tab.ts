import { defineStore } from 'pinia'
import piniaPersistConfig from "@/config/piniaPersist";
import {  TABS_BLACK_LIST } from "@/config/config";
import router from "@/router";

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    tabsMenuValue:'/home',
    tabsMenuList:[{
      title:'menus.home',
      path:'/home',
      icon:'HomeFilled',
      close:false
    }]
  }),
  actions: {
    // Add Tabs
		async addTabs(tabItem:any) {
			// not add tabs black list
			if (TABS_BLACK_LIST.includes(tabItem.path)) return;
			const tabInfo:any = {
				title: tabItem.title,
				path: tabItem.path,
				close: tabItem.close
			};
			if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabInfo);
			}
			this.setTabsMenuValue(tabItem.path);
		},
		// Remove Tabs
		async removeTabs(tabPath: string) {
			let tabsMenuValue = this.tabsMenuValue;
			const tabsMenuList = this.tabsMenuList;
			if (tabsMenuValue === tabPath) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					tabsMenuValue = nextTab.path;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuValue = tabsMenuValue;
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
    // Set TabsMenuValue
		async setTabsMenuValue(tabsMenuValue: string) {
			this.tabsMenuValue = tabsMenuValue;
		},
    // Set TabsMenuList
		async setTabsMenuList(tabsMenuList:any) {
			this.tabsMenuList = tabsMenuList;
		},
  },
  persist: piniaPersistConfig("tabs")
})



