import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// 路由独享守卫
function checkedEnter (path, next) {
  let menusUrl = store.state.userInfo.menus_url
  if (menusUrl.includes(path)) {
    next()
  } else {
    next('/index')
  }
}
export const indexRoutes = [
  {
    path: '/menu',
    name: '菜单管理',
    component: () => import('../pages/menu/menu.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/menu', next)
    }
  },
  {
    path: '/role',
    name: '角色管理',
    component: () => import('../pages/role/role.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/role', next)
    }
  },
  {
    path: '/manage',
    name: '管理员管理',
    component: () => import('../pages/manage/manage.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/manage', next)
    }
  },
  {
    path: '/cate',
    name: '商品分类',
    component: () => import('../pages/cate/cate.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/cate', next)
    }
  },
  {
    path: '/spec',
    name: '商品规格',
    component: () => import('../pages/specs/specs.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/spec', next)
    }
  },
  {
    path: '/goods',
    name: '商品管理',
    component: () => import('../pages/goods/goods.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/goods', next)
    }
  },
  {
    path: '/member',
    name: '会员管理',
    component: () => import('../pages/member/member.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/member', next)
    }
  },
  {
    path: '/banner',
    name: '轮播图管理',
    component: () => import('../pages/banner/banner.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/banner', next)
    }
  },
  {
    path: '/seckill',
    name: '秒杀活动',
    component: () => import('../pages/seckill/seckill.vue'),
    beforeEnter (to, from, next) {
      checkedEnter('/seckill', next)
    }
  },
  {
    path: '',
    name: '主页',
    component: () => import('../pages/index/home.vue')
    // beforeEnter (to, from, next) {
    //   checkedEnter('', next)
    // }
  }
]
Vue.use(Router)
const routes = [
  { path: '/login', component: () => import('../pages/login/login.vue') },
  {
    path: '/index',
    component: () => import('../pages/index/index.vue'),
    children: [...indexRoutes,
      {path: '/goodsAdd',
        name: '商品添加与修改',
        component: () => import('../pages/goods/compoents/add.vue')}
    ]
  },
  { path: '/', component: () => import('../pages/login/login.vue') }
]
let router = new Router({
  routes
})
// 登陆拦截
router.beforeEach((to, from, next) => {
  // 前往登录
  if (to.path === '/login') {
    next()
    return
  }
  // 前往不是登录
  if (store.state.userInfo.token) {
    next()
    return
  }
  next('/login')
})

export default router
