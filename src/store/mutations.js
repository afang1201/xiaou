export const state = {
  // 用户信息
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
}
export const mutations = {
  changeuserInfo (state, arr) {
    state.userInfo = arr
  }
}
export const getters = {
  userInfo (state) {
    return state.userInfo
  }
}
