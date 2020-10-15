
import {getMebber} from '../../utils/request'

const state = {
  // 会员列表信息
  memberList: []
}

const mutations = {
  // 更改会员列表信息
  changeMember (state, arr) {
    state.memberList = arr
  }
}

const actions = {
  // 获取会员列表信息
  reqMember (context) {
    getMebber().then(res => {
      context.commit('changeMember', res.data.list)
    })
  }
}

const getters = {
  memberList (state) {
    return state.memberList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
