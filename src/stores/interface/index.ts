import type {ArtcateListInt} from '@/types/artcate'
import type {ArticleListInt} from '@/types/articles'
export interface UserInfoInt{
  id:number,
  username:string,
  nickname:string,
  email:string,
  user_pic:string
}

export interface UserState{
  userInfo:UserInfoInt
}

export interface ArticleState{
  cateList:ArtcateListInt[],
  relArticle:ArticleListInt
}