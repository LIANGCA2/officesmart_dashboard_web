import { HttpMethod, HttpRequestParameter, HttpData, request } from './../plugins/http'
import cloneDeep from 'lodash/cloneDeep'
import { SearchCriteria } from '../views/data-trace/schema'

export const findAllBySearchCriteria = (searchCriteria = new SearchCriteria(), opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/data-trace/search',
    method: HttpMethod.POST,
    requestData: new HttpData({ metaData: searchCriteria })
  }, opts))
}

export const statisticsPOST = (statisticsCriteriaList = [], opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/data-trace/statistics',
    method: HttpMethod.POST,
    requestData: new HttpData({ metaData: statisticsCriteriaList })
  }, opts))
}

export const statisticsTimePOST = (statisticsCriteria, opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/data-trace/statistics/time',
    method: HttpMethod.POST,
    requestData: new HttpData({ metaData: statisticsCriteria })
  }, opts))
}

export const statisticsTraceFlowPOST = (dateRange, opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/data-trace/statistics/trace-flow',
    method: HttpMethod.POST,
    requestData: new HttpData({ metaData: dateRange })
  }, opts))
}
