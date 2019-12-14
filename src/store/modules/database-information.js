import api from './../../api'

const state = {
  collectionStats: {}
}

const getters = {
  getCollectionStats: state => state.collectionStats
}

const mutations = {
  setCollectionStats: (state, collectionStats) => {
    Object.assign(state.collectionStats, collectionStats)
  }
}

const actions = {
  async retrieveCollectionStats ({ commit }, collections) {
    let collectionStats = {}
    for (let collection of collections) {
      const response = await api.databaseInformation.getCollectionStats(collection)
      collectionStats[collection] = response.responseData.data
    }
    commit('setCollectionStats', collectionStats)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
