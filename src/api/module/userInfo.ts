import requests from "@/api/request";
import type {updateUser,updatePwdInt} from '@/types/user'

export const getUserInfo = () => {
  return requests({
    url: '/my/userinfo',
    method: 'get',
  })
}

export const updateUserInfo = (data:updateUser) => {
  return requests({
    url: '/my/userinfo',
    method: 'post',
    data
  })
}

export const updatePwd = (data:updatePwdInt) => {
  return requests({
    url: '/my/updatepwd',
    method: 'post',
    data
  })
}