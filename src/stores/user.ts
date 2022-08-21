import { defineStore,createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { getUserInfo } from "@/api/module/userInfo";
import piniaPersistConfig from "@/config/piniaPersist";
import type { UserState } from './interface';

export const useUserStore = defineStore({
  id: 'user',
  state: ():UserState => ({
    userInfo : {
      id:0,
      username:'',
      nickname:'',
      email:'',
      user_pic:''
    }
  }),
  getters: {
    
  },
  actions: {
    async setUserInfo(){
      const result = await getUserInfo()
      this.userInfo = result.data         
    }
  },
  persist: piniaPersistConfig("user")
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

export default pinia


