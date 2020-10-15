
import {getManage, ManageTotal} from '../../utils/request'

const state = {
  // 管理员列表信息
  manageList: [],
  // 一页的数量
  size: 5,
  // 总数
  total: 0,
  // 页码
  page: 1
}

const mutations = {
  // 更改管理员列表信息
  changeManage (state, arr) {
    state.manageList = arr
  },
  // 修改total
  changeTotal (state, num) {
    state.total = num
  },
  // 修改页码
  changePage (state, page) {
    state.page = page
  }
}

const actions = {
  // 获取管理员列表信息
  reqManage (context) {
    getManage({page: context.state.page, size: context.state.size}).then(res => {
      // 如果取list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
      let list = res.data.list ? res.data.list : []
      // 如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
      if (context.state.page > 1 && list.length === 0) {
        context.commit('changePage', context.state.page - 1)
        context.dispatch('reqManage')
        return
      }
      context.commit('changeManage', res.data.list)
    })
  },
  // 获取管理员总数
  reqManageTotal (context) {
    ManageTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  // 组件修改了页码
  changePageAction (context, page) {
    // 修改页码
    context.commit('changePage', page)
    // 发起list请求
    context.dispatch('reqManage')
  }
}

const getters = {
  manageList (state) {
    return state.manageList
  },
  total (state) {
    return state.total
  },
  size (state) {
    return state.size
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
