import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import router from '../router'
import {warningAlert} from './alert'
// import qs from 'qs'
let baseUrl = '/api'
// 开发环境下使用
Vue.prototype.$imgPre = 'http://localhost:3000'
// 打包
// let baseUrl = ''
// Vue.prototype.$imgPre = ''
// 请求拦截
axios.interceptors.request.use(req => {
  if (req.url !== '/api/api/login') {
    req.headers.authorization = store.state.userInfo.token
  }
  console.log(req)
  return req
})
// 响应拦截
axios.interceptors.response.use(res => {
  console.group('=====本次请求路径是:' + res.config.url)
  console.log(res)
  console.groupEnd()
  // res.data.msg = '登录已过期或访问权限受限'
  // 用户掉线了
  if (res.data.msg === '登录已过期或访问权限受限') {
    warningAlert(res.data.msg)
    router.push('/login')
  }

  return res
})

// 获取菜单列表信息
export const getMenulist = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menulist',
    params: {istree: true}
  })
}
// 菜单添加
export const addMenu = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuadd',
    data: form
  })
}
// 菜单修改
export const editMenu = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuedit',
    data: form
  })
}
// 菜单删除
export const delMenu = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menudelete',
    data: {id}
  })
}
// 获取菜单详情（1条）
export const getMenuInfo = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menuinfo',
    params: {id}
  })
}
// 管理员登录
export const userLogin = (loginInfo) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userlogin',
    data: loginInfo
  })
}
// 角色列表获取
export const getRole = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/rolelist'
  })
}
// 添加角色
export const addRole = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleadd',
    data: form
  })
}
// 获取角色信息（1条）
export const getRoleOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/roleinfo',
    params: {id}
  })
}
// 修改角色
export const editRole = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleedit',
    data: form
  })
}
// 删除角色
export const delRole = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roledelete',
    data: {id}
  })
}
// 获取管理员列表
export const getManage = (info) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userlist',
    params: info
  })
}

// 管理员获取（1）条
export const getManageOne = (uid) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userinfo',
    params: {uid}
  })
}

// 管理员修改
export const editManage = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useredit',
    data: form
  })
}

// 管理员删除
export const delManage = (uid) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userdelete',
    data: {uid}
  })
}

// 管理员总数
export const ManageTotal = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/usercount'
  })
}
// 管理员添加
export const addManag = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useradd',
    data: form
  })
}

// 获取商品分类列表
export const getCateList = (form) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/catelist',
    params: form
  })
}
// 商品分类添加
export const addCates = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/cateadd',
    data: data
  })
}
// 商品分类获取（一条）
export const getCateOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/cateinfo',
    params: {id}
  })
}
// 商品分类修改
export const editCate = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/cateedit',
    data: data
  })
}
// 商品分类删除
export const delCate = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/catedelete',
    data: {id}
  })
}
// 商品规格总数
export const getSpecscount = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specscount'
  })
}
// 商品规格列表（分页）
export const getSpecsList = (info) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specslist',
    params: info
  })
}

// 商品规格获取（一条）
export const getSpecsOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specsinfo',
    params: {id}
  })
}

// 商品规格修改
export const editSpecs = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsedit',
    data: form
  })
}
// 商品规格删除
export const delSpecs = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsdelete',
    data: {id}
  })
}

// 商品规格添加
export const addSpecs = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/specsadd ',
    data: form
  })
}
/** * ***************商品列表*********************/
// 商品总数
export const getGoodsCount = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodscount'
  })
}
// 商品列表（分页）
export const getGoodsList = (form) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodslist',
    params: form
  })
}
// 商品获取（一条）
export const getGoodOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/goodsinfo',
    params: {id}
  })
}
// 商品修改
export const editGood = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsedit',
    data: data
  })
}
// 商品删除
export const delGood = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsdelete',
    data: {id}
  })
}
// 商品添加
export const addGood = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/goodsadd',
    data: data
  })
}
/** * ***************会员管理*********************/
// 会员列表
export const getMebber = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/memberlist'
  })
}
// 会员获取（一条）
export const getMebberOne = (uid) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/memberinfo',
    params: {uid}
  })
}
// 会员修改
export const editMebber = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/memberedit',
    data: form
  })
}
/** * ***************轮播图*********************/
// 轮播图添加
export const addBanner = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/banneradd',
    data: data
  })
}
// 轮播图修改
export const editBanner = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/banneredit',
    data: data
  })
}
// 轮播图列表
export const getBanner = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/bannerlist'
  })
}
// 轮播图获取（一条）
export const getBannerOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/bannerinfo',
    params: {id}
  })
}
// 轮播图删除
export const delBanner = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/bannerdelete',
    data: {id}
  })
}
/** * ***************秒杀活动*********************/
// 限时秒杀列表
export const getSecklist = () => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/secklist'
  })
}
// 限时秒杀获取（一条）
export const getSecklistOne = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/seckinfo',
    params: {id}
  })
}
// 限时秒杀修改
export const editSecklist = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckedit',
    data: form
  })
}
// 限时秒杀删除
export const delSecklist = (id) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckdelete',
    data: {id}
  })
}
// 限时秒杀添加
export const addSecklist = (form) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/seckadd',
    data: form
  })
}
