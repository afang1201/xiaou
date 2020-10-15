
import {getBanner} from '../../utils/request'

const state = {
  // 轮播图列表信息
  bannerList: []
}

const mutations = {
  // 更改轮播图列表信息
  changeBanner (state, arr) {
    state.bannerList = arr
  }
}

const actions = {
  // 获取轮播图列表信息
  reqBanner (context) {
    getBanner().then(res => {
      context.commit('changeBanner', res.data.list)
    })
  }
}

const getters = {
  bannerList (state) {
    return state.bannerList
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
