import { defineStore } from 'pinia'
import { getEchartsData } from "@/api/module/echarts";
import piniaPersistConfig from "@/config/piniaPersist";
import type {RootObject,Children,ChinaTotal,ChinaAdd,StatisGradeCityDetail} from './interface/echarts'

export const useEchartsStore = defineStore({
  id: 'echarts',
  state: ()  => ({
   echartsList:<RootObject>{},
   item:<Children[]>[],
   chinaAdd:<ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    cityDetail:<StatisGradeCityDetail[]>[],
  }),
  actions: {
    async setEchartsList(){
      const result = await getEchartsData();
      this.echartsList = result.data.data  
      this.chinaAdd = this.echartsList.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.echartsList.diseaseh5Shelf.chinaTotal  
      this.cityDetail = this.echartsList.statisGradeCityDetail.slice(0,10)
    }
  },
  persist: piniaPersistConfig("echarts")
})



