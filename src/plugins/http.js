import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'
import Http from 'axios'
import { HttpConfiguration } from './http-config'

Object.assign(Http.defaults, HttpConfiguration)

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const HttpRequestParameter = {
  method: HttpMethod.GET,
  url: '/',
  requestData: new HttpData(),
  timestamp: 0,
  split: false,
  dataConvertChain: undefined,
  responseDataSplit: false,
  responseDataConvertChain: undefined,
  ignoreException: false,
  transferQueries: false
}

export const HttpResponse = {
  responseData: new HttpData(),
  timestamp: {
    request: 0,
    response: 0
  },
  useTime: 0,
  split: false,
  dataConvertChain: undefined
}

export function HttpData ({ metaData, wrapData, data } = {}) {
  this.metadata = metaData || undefined
  this.wrapData = wrapData || undefined
  this.data = data || undefined
}

export function ConvertChain ({ beforeConvert, converters, afterConvert }) {
  this.beforeConvert = beforeConvert || (httpData => {})
  this.converters = converters || []
  this.afterConvert = afterConvert || (httpData => httpData.wrapData)
}

export function Converter ({ convertRequestData, convertResponseData }) {
  this.convertRequestData = convertRequestData || ((metaData, httpData) => {})
  this.convertResponseData = convertResponseData || ((metaData, httpData) => {})
}

export function SystemError (systemErrorLog) {
  this.systemErrorLog = systemErrorLog || undefined
}

export function HttpError ({ errorMessage, httpRequestParameter, statusCode }) {
  this.errorMessage = errorMessage || 'HTTP_REQUEST_ERROR'
  this.httpRequestParameter = httpRequestParameter || undefined
  this.statusCode = statusCode || undefined
}

export function ResourceNotFoundError ({ httpRequestParameter }) {
  this.httpRequestParameter = httpRequestParameter || undefined
}

export function AuthenticationError (authenticationErrorLog) {
  this.authenticationError = authenticationErrorLog || undefined
}

function httpRequest (httpRequestParameter) {
  httpRequestParameter.timestamp = new Date().getTime()
  return new Promise((resolve, reject) => {
    Http(Object.assign(httpRequestParameter, { data: httpRequestParameter.requestData.data }))
      .then((response) => {
        if (response) {
          const responseTimestamp = new Date().getTime()
          const httpResponse = Object.assign(cloneDeep(HttpResponse), {
            responseData: new HttpData({ metaData: response.data }),
            timestamp: {
              request: httpRequestParameter.timestamp,
              response: responseTimestamp
            },
            useTime: responseTimestamp - httpRequestParameter.timestamp,
            split: httpRequestParameter.responseDataSplit,
            dataConvertChain: httpRequestParameter.responseDataConvertChain
          })
          resolve(httpResponse)
        } else {
          reject(new HttpError({ errorMessage: 'EMPTY RESPONSE', httpRequestParameter: httpRequestParameter }))
        }
      }).catch(error => {
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case 500: reject(new SystemError(error.response.data)); break
            case 400: case 401: case 402: case 403: reject(new AuthenticationError(error.response.data)); break
            case 404: reject(new ResourceNotFoundError({ httpRequestParameter: httpRequestParameter })); break
            default: reject(new HttpError({ statusCode: error.response.status, httpRequestParameter: httpRequestParameter }))
          }
        } else {
          reject(new HttpError({ statusCode: 'NON', httpRequestParameter: httpRequestParameter }))
        }
      })
  })
}

function getQueries () {
  let { search } = window.location
  if (!search || search.indexOf('?') === -1) {
    return {}
  }
  return search.substr(search.indexOf('?') + 1).split('&').map(s => ({ [ s.substr(0, s.indexOf('=')) ]: decodeURIComponent(s.substr(s.indexOf('=') + 1)) })).reduce((qs, q) => ({ ...qs, ...q }))
}

function preHandler (httpRequestParameter) {
  return new Promise((resolve, reject) => {
    if (!httpRequestParameter) {
      reject(new Error('Request parameter cannot be null'))
    }
    if (httpRequestParameter.transferQueries) {
      Object.assign(httpRequestParameter, {
        params: Object.assign(getQueries(), httpRequestParameter.params || {})
      })
    }
    if (!httpRequestParameter.dataConvertChain) {
      if (httpRequestParameter.requestData) {
        httpRequestParameter.requestData.data = httpRequestParameter.requestData.metadata
      }
      resolve(httpRequestParameter)
    }
    if (!(httpRequestParameter.dataConvertChain.converters instanceof Array)) {
      reject(new Error('Request data convert chain converters must be Array'))
    }
    if (httpRequestParameter.split && !(httpRequestParameter.data instanceof Array)) {
      reject(new Error('Cannot split request data'))
    }
    try {
      httpRequestParameter.dataConvertChain.beforeConvert(httpRequestParameter.requestData)
      if (httpRequestParameter.split) {
        httpRequestParameter.requestData.wrapData = httpRequestParameter.requestData.metadata.reduce((pre, currentMetaData) => {
          let tmpWrapData = {}
          httpRequestParameter.dataConvertChain.converters.forEach(converter => {
            Object.assign(tmpWrapData, converter.convertRequestData(currentMetaData, httpRequestParameter.requestData))
          })
          pre.push(tmpWrapData)
          return pre
        }, [])
      } else {
        httpRequestParameter.requestData.wrapData = {}
        httpRequestParameter.dataConvertChain.converters.forEach(converter => {
          Object.assign(httpRequestParameter.requestData.wrapData, converter.convertRequestData(httpRequestParameter.requestData.metadata, httpRequestParameter.requestData))
        })
      }
      httpRequestParameter.requestData.data = httpRequestParameter.dataConvertChain.afterConvert(httpRequestParameter.requestData)
      resolve(httpRequestParameter)
    } catch (e) {
      reject(e)
    }
  })
}

function responseHandler (httpResponse) {
  return new Promise((resolve, reject) => {
    if (!httpResponse) {
      reject(new Error('Response cannot be null'))
    }
    if (!httpResponse.dataConvertChain) {
      if (httpResponse.responseData) {
        httpResponse.responseData.data = httpResponse.responseData.metadata
      }
      resolve(httpResponse)
    }
    if (!(httpResponse.dataConvertChain.converters instanceof Array)) {
      reject(new Error('Response data convert chain converters must be Array'))
    }
    if (httpResponse.split && !(httpResponse.responseData.metadata instanceof Array)) {
      reject(new Error('Cannot split response data'))
    }
    try {
      httpResponse.dataConvertChain.beforeConvert(httpResponse.responseData)
      if (httpResponse.split) {
        httpResponse.responseData.wrapData = httpResponse.responseData.metadata.reduce((pre, currentMetaData) => {
          let tmpWrapData = {}
          httpResponse.dataConvertChain.converters.forEach(converter => {
            Object.assign(tmpWrapData, converter.convertResponseData(currentMetaData, httpResponse.responseData))
          })
          pre.push(tmpWrapData)
          return pre
        }, [])
      } else {
        httpResponse.responseData.wrapData = {}
        httpResponse.dataConvertChain.converters.forEach(converter => {
          Object.assign(httpResponse.responseData.wrapData, converter.convertResponseData(httpResponse.responseData.metadata, httpResponse.responseData))
        })
      }
      httpResponse.responseData.data = httpResponse.dataConvertChain.afterConvert(httpResponse.responseData)
      resolve(httpResponse)
    } catch (e) {
      reject(e)
    }
  })
}

export function request (httpRequestParameter) {
  return new Promise((resolve, reject) => {
    preHandler(httpRequestParameter).then(httpRequest).then(responseHandler).then(response => {
      resolve(response)
    }).catch(error => {
      if (httpRequestParameter.ignoreException || error instanceof ResourceNotFoundError) {
        resolve(null)
      }
      reject(error)
    })
  })
}

Vue.prototype.$request = request
