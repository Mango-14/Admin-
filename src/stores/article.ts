import { defineStore } from 'pinia'
import { getCates } from "@/api/module/artcate";
import piniaPersistConfig from "@/config/piniaPersist";
import type { ArticleState } from './interface';

export const useArticleStore = defineStore({
  id: 'article',
  state: ():ArticleState => ({
    cateList : [],
    relArticle:{
      title: "",
      content: "",
      state: "",
      cate_id: null,
      author_id: 0
    }
  }),
  getters: {
    
  },
  actions: {
    async setCateList(){
      const result = await getCates();
      this.cateList = result.data        
    }
  },
  persist: piniaPersistConfig("article")
})



