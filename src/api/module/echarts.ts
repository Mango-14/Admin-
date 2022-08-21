import requests from "@/api/request";

export const getEchartsData = () => {
  return requests({
    url: '/api/echartsData',
    method: 'get',
  })
}