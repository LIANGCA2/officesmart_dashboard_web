import { Converter } from '../../plugins/http'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import get from 'lodash/get'

export function SearchCriteria ({
  traceId,
  traceFlowId,
  status,
  includeTypes,
  bizKeys,
  startCreatedDate,
  endCreatedDate,
  startLastModifiedDate,
  endLastModifiedDate } = {}) {
  this.traceId = traceId || null
  this.traceFlowId = traceFlowId || null
  this.status = status || null
  this.includeTypes = includeTypes || null
  this.bizKeys = bizKeys || null
  this.startCreatedDate = startCreatedDate || null
  this.endCreatedDate = endCreatedDate || null
  this.startLastModifiedDate = startLastModifiedDate || null
  this.endLastModifiedDate = endLastModifiedDate || null
}

SearchCriteria.Status = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
}

SearchCriteria.Type = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
}

export const SearchCriteriaConverter = new Converter({
  convertRequestData: searchCriteria => new SearchCriteria({
    traceId: searchCriteria.traceId,
    traceFlowId: searchCriteria.traceFlowId,
    status: searchCriteria.status,
    includeTypes: searchCriteria.includeTypes,
    bizKeys: searchCriteria.bizKeys.filter(bizKey => bizKey.key && bizKey.value).reduce((pre, cur) => { pre[cur.key] = cur.value; return pre }, {}),
    startCreatedDate: get(searchCriteria, 'createdDate[0]'),
    endCreatedDate: get(searchCriteria, 'createdDate[1]'),
    startLastModifiedDate: get(searchCriteria, 'lastModifiedDate[0]'),
    endLastModifiedDate: get(searchCriteria, 'lastModifiedDate[1]')
  }),
  convertResponseData: searchResult => {
    return groupBy(searchResult.map(dataTrace => {
      dataTrace.traceLogs = orderBy(dataTrace.traceLogs, 'timestamp', 'asc')
      return dataTrace
    }), 'traceFlow.id')
  }
})

export function IViewFile ({ baseUrl = 'http://cosbw21_8788.cosacz.civ.pd.cd.bm.devops.OfficeSmart.org', basePath = '/iview/servlet/DownloadFile', filePath }) {
  if (!filePath) {
    console.warn('File path cannot be empty!')
    return
  }
  this.pathDelimiter = filePath.toString().includes('\\') ? '\\' : '/'
  this.protocolDelimiter = filePath.toString().includes(':\\') ? ':\\' : ':/'
  this.getDetailsFromFilePath = () => {
    const lastIndexOfSlash = filePath.toString().lastIndexOf(this.pathDelimiter)
    if (lastIndexOfSlash === -1) {
      console.warn(`Cannot get dirname and filename form file path because not exists \\'${this.pathDelimiter}\\' in the path`)
      return null
    }
    const filename = filePath.substring(lastIndexOfSlash + 1)
    const dirname = filePath.substring(filePath.indexOf(this.protocolDelimiter) === -1 ? 0 : filePath.indexOf(this.protocolDelimiter) + 1, filePath.toString().length - (filename.length + 1))
    return { dirname, filename }
  }
  this.download = () => {
    const query = { apps: 'iview', ...this.getDetailsFromFilePath() }
    const link = document.createElement('a')
    link.style.display = 'none'
    link.target = '_blank'
    link.href = `${baseUrl}${basePath}?${Object.keys(query).reduce((pre, cur) => { pre.push(`${cur}=${query[cur]}`); return pre }, []).join('&')}`
    document.body.appendChild(link)
    console.info(`Download Link: ${link.href}`)
    link.click()
    document.body.removeChild(link)
  }
}

export function StatisticsCriteria ({ dateRange, statisticsUnit } = {}) {
  this.dateRange = dateRange || null
  this.statisticsUnit = statisticsUnit || StatisticsCriteria.StatisticsUnit.SECONDS_5
}

StatisticsCriteria.StatisticsUnit = {
  SECONDS_5: 'SECONDS_5',
  SECONDS_10: 'SECONDS_10',
  SECONDS_30: 'SECONDS_30',
  MINUTES_1: 'MINUTES_1',
  MINUTES_2: 'MINUTES_2',
  MINUTES_5: 'MINUTES_5',
  MINUTES_10: 'MINUTES_10',
  MINUTES_30: 'MINUTES_30',
  HOURS_1: 'HOURS_1',
  HOURS_12: 'HOURS_12',
  DAYS_1: 'DAYS_1',
  DAYS_7: 'DAYS_7',
  DAYS_30: 'DAYS_30'
}
