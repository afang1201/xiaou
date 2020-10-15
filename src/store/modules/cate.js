
import {getCateList} from '../../utils/request'

const state = {
  // 商品列表信息
  cateList: []
}

const mutations = {
  // 更改商品列表信息
  changeCate (state, arr) {
    state.cateList = arr
  }
}

const actions = {
  // 获取菜单列表信息
  async reqCate (context) {
    await getCateList({istree: true}).then(res => {
      context.commit('changeCate', res.data.list)
    })
  }
}

const getters = {
  cateList (state) {
    return state.cateList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
