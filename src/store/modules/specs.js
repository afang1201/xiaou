
import {getSpecsList, getSpecscount} from '../../utils/request'

const state = {
  // 规格列表信息
  specsList: [],
  // 一页的数量
  size: 5,
  // 总数
  total: 0,
  // 页码
  page: 1
}

const mutations = {
  // 更改规格列表信息
  changespecsList (state, arr) {
    state.specsList = arr
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
  // 获取规格列表信息
  async reqspecsList (context) {
    await getSpecsList({page: context.state.page, size: context.state.size}).then(res => {
      // 如果取list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
      let list = res.data.list ? res.data.list : []
      // 如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
      if (context.state.page > 1 && list.length === 0) {
        context.commit('changePage', context.state.page - 1)
        context.dispatch('reqspecsList')
        return
      }
      context.commit('changespecsList', res.data.list)
    })
  },
  // 获取管理员总数
  reqSpecsTotal (context) {
    getSpecscount().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  // 组件修改了页码
  changePageAction (context, page) {
    // 修改页码
    context.commit('changePage', page)
    // 发起list请求
    context.dispatch('reqspecsList')
  }
}

const getters = {
  specsList (state) {
    for (let i in state.specsList) {
      if (state.specsList[i].attrs.length !== 0) {
        state.specsList[i].attrs = state.specsList[i].attrs.map((item) => {
          return item.replace('[', '').replace(']', '').replace('"', '').replace('"', '')
        })
      }
    }
    return state.specsList
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
