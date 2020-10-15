
import {getSecklist} from '../../utils/request'

const state = {
  // 秒杀列表信息
  seckillList: []
}

const mutations = {
  // 更改秒杀列表信息
  changeseckillList (state, arr) {
    state.seckillList = arr
  }
}

const actions = {
  // 获取秒杀列表信息
  async reqseckillList (context) {
    await getSecklist().then(res => {
      context.commit('changeseckillList', res.data.list)
    })
  }
}

const getters = {
  seckillList (state) {
    return state.seckillList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
