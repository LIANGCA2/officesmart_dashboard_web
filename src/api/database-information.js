import { HttpMethod, HttpRequestParameter, request } from './../plugins/http'
import cloneDeep from 'lodash/cloneDeep'

export const getCollectionStats = (collection, opts = {}) => {
  if (!collection) {
    console.warn(`Collection cannot be empty, please check!`)
    return null
  }
  return request(Object.assign(cloneDeep(HttpRequestParameter), {
    url: `/api/${collection}/mongo-stats`,
    method: HttpMethod.GET
  }, opts))
}
