export const actions = {
  reqUserInfo (context, info) {
    if (info.id) {
      context.commit('changeuserInfo', info)
    } else {
      localStorage.removeItem('userInfo')
      context.commit('changeuserInfo', info)
    }
  }
}
