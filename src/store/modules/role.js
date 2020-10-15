import {getRole} from '../../utils/request'

const state = {
  // 角色列表信息
  rouleList: []
}

const mutations = {
  // 更改角色列表信息
  changeRole (state, arr) {
    state.rouleList = arr
  }
}

const actions = {
  // 获取角色列表信息
  reqRole (context) {
    getRole().then(res => {
      context.commit('changeRole', res.data.list)
    })
  }
}

const getters = {
  rouleList (state) {
    return state.rouleList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
