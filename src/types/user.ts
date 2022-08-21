export interface UserInfo{
  id:number,
  username:string
  password:string,
  nickname:string,
  email:string,
  user_pic:string
}

export interface updateUser{
  id:number,
  nickname:string,
  email:string,
}

export interface updatePwdInt{
  id:number,
  oldPwd:string,
  newPwd:string,
}

export class Data {
  updateData: updateUser = {
    id: 0,
    nickname: "",
    email: ""
  }
  updataPwd:updatePwdInt = {
    id: 0,
    oldPwd: "",
    newPwd: ""
  }
  isShow=false
  isChange = false
  isUpload = false
}