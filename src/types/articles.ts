export interface ArticleInt {
  id:number,
  title:string,
  content:string,
  cover_img :string,
  pub_date :string,
  state:string,
  is_delete :string,
  cate_id:number |null,
  author_id:number
}

export interface ArticleListInt {
  title:string,
  content:string,
  state:string,
  cate_id:number |null,
  author_id:number
}

export interface SelArtInt{
  title:string,
  cate_id:number |null,
  page :number ,
  count: number,
  page_size:number
}

export class Data {
  selectData: SelArtInt = {
    title: "",
    cate_id: null,
    page: 1,
    count: 0,
    page_size: 6
  }
  articlesList :ArticleInt[] =[]
  sliceArticlesList :ArticleInt[][] =[]
  currentAtricle :ArticleInt={
    id: 0,
    title: "",
    content: "",
    cover_img: "",
    pub_date: "",
    state: "",
    is_delete: "",
    cate_id: null,
    author_id: 0
  }
  isShow = false
}