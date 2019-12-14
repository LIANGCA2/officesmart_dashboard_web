import { StatisticsCriteria } from './views/data-trace/schema'
const shortid = require('shortid')

export const Intervals = [
  { label: '5s', value: 5 * 1000 },
  { label: '10s', value: 10 * 1000 },
  { label: '30s', value: 30 * 1000 },
  { label: '1m', value: 60 * 1000 },
  { label: '2m', value: 2 * 60 * 1000 },
  { label: '5m', value: 5 * 60 * 1000 },
  { label: '10m', value: 10 * 60 * 1000 },
  { label: '30m', value: 30 * 60 * 1000 },
  { label: '1h', value: 60 * 60 * 1000 }
]

export const DateRange = [
  { label: '1m / 5s', value: shortid.generate(), setting: { interval: 'minute', count: -1, unit: StatisticsCriteria.StatisticsUnit.SECONDS_5, dateFormat: 'HH:mm' } },
  { label: '2m / 10s', value: shortid.generate(), setting: { interval: 'minute', count: -2, unit: StatisticsCriteria.StatisticsUnit.SECONDS_10, dateFormat: 'HH:mm' } },
  { label: '5m / 30s', value: shortid.generate(), setting: { interval: 'minute', count: -5, unit: StatisticsCriteria.StatisticsUnit.SECONDS_30, dateFormat: 'HH:mm' } },
  { label: '10m / 30s', value: shortid.generate(), setting: { interval: 'minute', count: -10, unit: StatisticsCriteria.StatisticsUnit.SECONDS_30, dateFormat: 'HH:mm' } },
  { label: '30m / 1m', value: shortid.generate(), setting: { interval: 'minute', count: -30, unit: StatisticsCriteria.StatisticsUnit.MINUTES_1, dateFormat: 'HH:mm' } },
  { label: '30m / 2m', value: shortid.generate(), setting: { interval: 'minute', count: -30, unit: StatisticsCriteria.StatisticsUnit.MINUTES_2, dateFormat: 'HH:mm' } },
  { label: '1h / 5m', value: shortid.generate(), setting: { interval: 'hour', count: -1, unit: StatisticsCriteria.StatisticsUnit.MINUTES_5, dateFormat: 'HH:mm' } },
  { label: '1h / 10m', value: shortid.generate(), setting: { interval: 'hour', count: -1, unit: StatisticsCriteria.StatisticsUnit.MINUTES_10, dateFormat: 'HH:mm' } },
  { label: '1h / 30m', value: shortid.generate(), setting: { interval: 'hour', count: -1, unit: StatisticsCriteria.StatisticsUnit.MINUTES_30, dateFormat: 'HH:mm' } },
  { label: '2h / 10m', value: shortid.generate(), setting: { interval: 'hour', count: -2, unit: StatisticsCriteria.StatisticsUnit.MINUTES_10, dateFormat: 'HH:mm' } },
  { label: '2h / 30m', value: shortid.generate(), setting: { interval: 'hour', count: -2, unit: StatisticsCriteria.StatisticsUnit.MINUTES_30, dateFormat: 'HH:mm' } },
  { label: '5h / 30m', value: shortid.generate(), setting: { interval: 'hour', count: -5, unit: StatisticsCriteria.StatisticsUnit.MINUTES_30, dateFormat: 'HH:mm' } },
  { label: '5h / 1h', value: shortid.generate(), setting: { interval: 'hour', count: -5, unit: StatisticsCriteria.StatisticsUnit.HOURS_1, dateFormat: 'HH:mm' } },
  { label: '12h / 1h', value: shortid.generate(), setting: { interval: 'hour', count: -12, unit: StatisticsCriteria.StatisticsUnit.HOURS_1, dateFormat: 'HH:mm' } },
  { label: '1d / 1h', value: shortid.generate(), setting: { interval: 'day', count: -1, unit: StatisticsCriteria.StatisticsUnit.HOURS_1, dateFormat: 'MM/DD HH:mm' } },
  { label: '7d / 12h', value: shortid.generate(), setting: { interval: 'day', count: -1, unit: StatisticsCriteria.StatisticsUnit.HOURS_12, dateFormat: 'MM/DD HH:mm' } },
  { label: '7d / 1d', value: shortid.generate(), setting: { interval: 'day', count: -1, unit: StatisticsCriteria.StatisticsUnit.DAYS_1, dateFormat: 'MM/DD' } },
  { label: '90d / 7d', value: shortid.generate(), setting: { interval: 'day', count: -90, unit: StatisticsCriteria.StatisticsUnit.DAYS_7, dateFormat: 'MM/DD' } },
  { label: '180d / 7d', value: shortid.generate(), setting: { interval: 'day', count: -180, unit: StatisticsCriteria.StatisticsUnit.DAYS_7, dateFormat: 'MM/DD' } },
  { label: '180d / 30d', value: shortid.generate(), setting: { interval: 'day', count: -180, unit: StatisticsCriteria.StatisticsUnit.DAYS_30, dateFormat: 'MM/DD' } },
  { label: '360d / 30d', value: shortid.generate(), setting: { interval: 'day', count: -360, unit: StatisticsCriteria.StatisticsUnit.DAYS_30, dateFormat: 'MM/DD' } }
]
