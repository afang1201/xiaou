
import {getGoodsList, getGoodsCount} from '../../utils/request'

const state = {
  // 商品列表信息
  goodList: [],
  // 一页的数量
  size: 2,
  // 总数
  total: 0,
  // 页码
  page: 1
}

const mutations = {
  // 更改商品列表信息
  changeGoods (state, arr) {
    state.goodList = arr
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
  // 获取商品列表信息
  async reqGoodsList (context, form) {
    if (!form) {
      form = {page: context.state.page, size: context.state.size}
    }
    await getGoodsList(form).then(res => {
      // 如果取list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
      let list = res.data.list ? res.data.list : []
      // 如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
      if (context.state.page > 1 && list.length === 0) {
        context.commit('changePage', context.state.page - 1)
        context.dispatch('reqGoodsList')
        return
      }
      context.commit('changeGoods', res.data.list)
    })
  },
  // 获取员总数
  reqGoodsTotal (context) {
    getGoodsCount().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  // 组件修改了页码
  changePageAction (context, page) {
    // 修改页码
    context.commit('changePage', page)
    // 发起list请求
    context.dispatch('reqGoodsList')
  }
}

const getters = {
  goodList (state) {
    return state.goodList
  },
  total (state) {
    return state.total
  },
  size (state) {
    return state.size
  },
  page (state) {
    return state.page
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
