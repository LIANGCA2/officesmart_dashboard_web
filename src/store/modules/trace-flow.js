import api from './../../api'

const state = {
  traceFlows: []
}

const getters = {
  getTraceFlows: state => state.traceFlows
}

const mutations = {
  setTraceFlows: (state, traceFlows) => (state.traceFlows = traceFlows)
}

const actions = {
  async retrieveTraceFlows ({ commit }) {
    const response = await api.traceFlow.allGET()
    commit('setTraceFlows', response.responseData.data.content)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
