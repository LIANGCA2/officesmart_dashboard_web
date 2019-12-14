import { HttpMethod, HttpRequestParameter, HttpData, request } from './../plugins/http'
import cloneDeep from 'lodash/cloneDeep'

export const allGET = (params, opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/trace-flow',
    method: HttpMethod.GET,
    params
  }, opts))
}

export const savePOST = (traceFlow, opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: '/api/trace-flow',
    method: HttpMethod.POST,
    requestData: new HttpData({ metaData: traceFlow })
  }, opts))
}

export const deleteDELETE = (traceFlowId, opts = {}) => {
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: `/api/trace-flow/${traceFlowId}`,
    method: HttpMethod.DELETE
  }, opts))
}
