const state = {
  cachedRouteNames: [],
}

const mutations = {
  UPDATE_CACHEDROUTENAMES(state,{ action, route }) {
    const methods = {
      'add': () => {
        state.cachedRouteNames.push(route)
      },
      'delete': () => {
        state.cachedRouteNames.splice(state.cachedRouteNames.findIndex((e) => { return e === route}),1)
      }
    }
    methods[action]()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}

