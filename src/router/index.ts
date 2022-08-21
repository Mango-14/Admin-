import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/index.vue'),
        meta: { show: true, title: 'menus.home',icon:'HomeFilled' }
      },
      {
        path: '/article',
        component: () => import('../views/Article/index.vue'),
        redirect :'/article/artcate',
        meta: { show: true, title: 'menus.artManager',icon:'Memo' },
        children:[
          {
            path: '/article/artcate',
            name: 'artcate',
            component: () => import('../views/Article/Artcate/index.vue'),
            meta: { title: 'menus.artCateMan',icon:'List' }
          },
          {
            path: '/article/articles',
            name: 'articles',
            component: () => import('../views/Article/Articles/index.vue'),
            meta: {  title: 'menus.artManager',icon:'Collection' }
          },
          {
            path: '/article/releasaArt',
            name: 'releasaArt',
            component: () => import('../views/Article/ReleaseArt/index.vue'),
            meta: {  title: 'menus.relArt',icon:'DocumentAdd' }
          },
        ]        
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register/index.vue'),
        meta: { show: true, title: 'menus.addUser',icon:'User' }
      },
    ]
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../views/Echarts/index.vue'),
    meta: { show: true, title: 'menus.visualization',icon:'PieChart' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/UserInfo/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  const token = localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    return '/login'
  }else if(token && to.path == '/login'){
    return '/'
  }
})

export default router
