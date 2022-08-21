import requests from "@/api/request";
import type { ArtcateDateInt,ArtcateListInt } from "@/types/artcate";

//获取文章分类列表
export const getCates = () => {
  return requests({
    url: '/my/article/cates',
    method: 'get',
  })
}

//新增文章分类
export const addCates = (data:ArtcateDateInt) => {
  return requests({
    url: '/my/article/addcates',
    method: 'post',
    data
  })
}

//删除文章分类
export const delCates = (id:number) => {
  return requests({
    url: `/my/article/deletecate/${id}`,
    method: 'get',
  })
}

//更新文章分类
export const updateCates = (data:ArtcateListInt) => {
  return requests({
    url: `/my/article/updatecate`,
    method: 'post',
    data
  })
}

//获取文章列表
export const getArticles = () => {
  return requests({
    url: `/my/article/getarticles`,
    method: 'get',
  })
}

