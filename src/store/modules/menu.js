
import {getMenulist} from '../../utils/request'

const state = {
  // 菜单列表信息
  menuList: []
}

const mutations = {
  // 更改菜单列表信息
  changeMenu (state, arr) {
    state.menuList = arr
  }
}

const actions = {
  // 获取菜单列表信息
  reqMenu (context) {
    getMenulist().then(res => {
      context.commit('changeMenu', res.data.list)
    })
  }
}

const getters = {
  menuList (state) {
    return state.menuList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
