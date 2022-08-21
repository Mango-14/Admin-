import { defineStore } from 'pinia'
import piniaPersistConfig from "@/config/piniaPersist";

export const useMenusStore = defineStore({
  id: 'menus',
  state: () => ({
    isCollapse:false
  }),
  actions: {
   
  },
  persist: piniaPersistConfig("menus")
})



