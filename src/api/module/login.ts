import requests from "@/api/request";
import type {RegisterInfo} from '@/types/login'

interface loginData {
  username: string,
  password: string
}

export const login = (data: loginData) => {
  return requests({
    url: '/api/login',
    method: 'post',
    data
  })
}

export const register = (data: RegisterInfo) => {
  return requests({
    url: '/api/register',
    method: 'post',
    data
  })
}