import api from './../../api'
import Moment from 'moment'
import { StatisticsCriteria } from '../../views/data-trace/schema'

const state = {
  statisticsTimeIn24H: undefined,
  statisticsTimeRecent: undefined,
  statisticsTraceFlowIn24H: undefined
}

const getters = {
  getStatisticsTimeIn24H: state => state.statisticsTimeIn24H,
  getStatisticsTimeRecent: state => state.statisticsTimeRecent,
  getStatisticsTraceFlowIn24H: state => state.statisticsTraceFlowIn24H
}

const mutations = {
  setStatisticsTimeIn24H: (state, statisticsTimeIn24H) => (state.statisticsTimeIn24H = statisticsTimeIn24H),
  setStatisticsTimeRecent: (state, statisticsTimeRecent) => (state.statisticsTimeRecent = statisticsTimeRecent),
  setStatisticsTraceFlowIn24H: (state, statisticsTraceFlowIn24H) => (state.statisticsTraceFlowIn24H = statisticsTraceFlowIn24H)
}

const actions = {
  async retrieveStatisticsTimeIn24H ({ commit }) {
    const response = await api.dataTrace.statisticsTimePOST(new StatisticsCriteria({
      dateRange: Moment.rangeFromInterval('day', -2, new Date()),
      statisticsUnit: StatisticsCriteria.StatisticsUnit.DAYS_1
    }))
    commit('setStatisticsTimeIn24H', response.responseData.data)
  },
  async retrieveStatisticsTimeRecent ({ commit }, statisticsCriteria) {
    const response = await api.dataTrace.statisticsTimePOST(statisticsCriteria)
    commit('setStatisticsTimeRecent', response.responseData.data)
  },
  async retrieveStatisticsTraceFlowIn24H ({ commit }) {
    const response = await api.dataTrace.statisticsTraceFlowPOST(Moment.rangeFromInterval('day', -1, new Date()))
    commit('setStatisticsTraceFlowIn24H', response.responseData.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
