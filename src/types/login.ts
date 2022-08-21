export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterInfo{
  username:string,
  password:string,
  nickname:string,
  email:string,
}

export interface CheckRegisterInfo{
  username:string,
  password:string,
  checkpwd:string,
  nickname:string,
  email:string,
}

export class Data{
  registerForm:RegisterInfo = {
    username: "",
    password: "",
    nickname: "",
    email: "",
  }
  checkRegisterForm:CheckRegisterInfo={
    username: "",
    password: "",
    checkpwd: "",
    nickname: "",
    email: ""
  }
}
