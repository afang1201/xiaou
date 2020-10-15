import vue from 'vue'
import Vuex from 'vuex'
import {actions} from './actions'
import {state, getters, mutations} from './mutations'

import menu from '../store/modules/menu'
import role from '../store/modules/role'
import manage from '../store/modules/manage'
import cate from '../store/modules/cate'
import specs from '../store/modules/specs'
import member from '../store/modules/member'
import banner from '../store/modules/banner'
import goods from '../store/modules/goods'
import seckill from '../store/modules/seckill'
vue.use(Vuex)
export default new Vuex.Store({
  // state 状态
  state,
  // 修改state
  mutations,
  // 组件派发的动作
  actions,
  // 导出数据
  getters,
  // 模块
  modules: {
    menu,
    role,
    manage,
    cate,
    specs,
    member,
    banner,
    goods,
    seckill
  }
})
