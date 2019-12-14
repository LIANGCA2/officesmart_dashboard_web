<template>
  <page>
    <el-form inline size="mini" class="mt-4" slot="header-actions">
      <el-form-item>
        <span class="primary-text text-13">{{ $t('DataTraceLocale.monitoring.refreshSetting.interval') }}</span>
        <el-select class="mx-3" style="width: 90px;" v-model="refreshSetting.interval">
          <el-option
            v-for="interval in Intervals"
            :key="interval.label"
            :label="interval.label"
            :value="interval.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('DataTraceLocale.monitoring.refreshSetting.autoRefresh')">
        <el-switch v-model="refreshSetting.autoRefresh"/>
      </el-form-item>
      <el-form-item>
        <span class="info-text text-13">{{ $t('DataTraceLocale.monitoring.refreshSetting.lastRefreshTime') }} {{ $moment(lastRefreshTime).defaultFormat() }}</span>
      </el-form-item>
    </el-form>

    <div slot="header-limit-actions" class="text-14">
      <span class="mr-4">{{ $t('DataTraceLocale.monitoring.refreshSetting.interval') }} {{ Intervals.find(it => it.value === refreshSetting.interval).label }}</span>
      <span class="mr-4">{{ $t('DataTraceLocale.monitoring.refreshSetting.autoRefresh') }} {{ refreshSetting.autoRefresh ? $t('DefaultLocale.status.enable') : $t('DefaultLocale.status.disable') }}</span>
      <span>{{ $t('DataTraceLocale.monitoring.refreshSetting.lastRefreshTime') }} {{ $moment(lastRefreshTime).defaultFormat() }}</span>
    </div>

    <div id="monitoring" class="full-container">
      <el-row :gutter="12">
        <el-col :span="5">
          <counter-card type="primary" :label="$t('DataTraceLocale.monitoring.statisticsTimeIn24H.TOTAL')" icon-class="el-icon-document"
                        :start-val="get(getStatisticsTimeIn24H, 'TOTAL[0].count', 0)"
                        :end-val="get(getStatisticsTimeIn24H, 'TOTAL[1].count', 0)">
          </counter-card>
        </el-col>
        <el-col :span="5">
          <counter-card type="danger" :label="$t('DataTraceLocale.monitoring.statisticsTimeIn24H.ERROR')" icon-class="el-icon-circle-close"
                        :start-val="get(getStatisticsTimeIn24H, 'ERROR[0].count', 0)"
                        :end-val="get(getStatisticsTimeIn24H, 'ERROR[1].count', 0)">
          </counter-card>
        </el-col>
        <el-col :span="4">
          <counter-card type="warning" :label="$t('DataTraceLocale.monitoring.statisticsTimeIn24H.WARNING')"
            :start-val="get(getStatisticsTimeIn24H, 'WARNING[0].count', 0)"
            :end-val="get(getStatisticsTimeIn24H, 'WARNING[1].count', 0)">
          </counter-card>
        </el-col>
        <el-col :span="5">
          <counter-card type="success" :label="$t('DataTraceLocale.monitoring.statisticsTimeIn24H.SUCCESS')" icon-class="el-icon-circle-check"
            :start-val="get(getStatisticsTimeIn24H, 'SUCCESS[0].count', 0)"
            :end-val="get(getStatisticsTimeIn24H, 'SUCCESS[1].count', 0)">
          </counter-card>
        </el-col>
        <el-col :span="5">
          <percent-card :label="$t('DataTraceLocale.monitoring.statisticsTimeIn24H.STATISTICS')" :values="statisticsTrend"></percent-card>
        </el-col>
      </el-row>

      <el-row :gutter="12" class="mt-4">
        <el-col :span="19">
          <standard-card :label="$t('DataTraceLocale.monitoring.statisticsTimeRecent.title', { recent: statisticsTimeRecentSettingDateRange.label })"
                         icon-class="el-icon-pie-chart">
            <div class="flex flex-horizontal" slot="header-actions">
              <el-popover placement="right" width="150" trigger="click">
                <el-form size="mini" label-position="top">
                  <el-form-item :label="$t('DataTraceLocale.monitoring.statisticsTimeRecent.setting.dateRangeAndUnit')">
                    <el-select v-model="statisticsTimeRecentSetting.dateRange">
                      <el-option
                        v-for="dr in DateRange"
                        :key="dr.label"
                        :label="dr.label"
                        :value="dr.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <i slot="reference" class="el-icon-setting text-18 primary icon-btn cursor-pointer"></i>
              </el-popover>
            </div>
            <ve-histogram :data="statisticsTimeRecentChartData"
                          :settings="statisticsTimeRecentChart.settings"
                          :colors="statisticsTimeRecentChart.colors"
                          :extend="statisticsTimeRecentChart.extend"></ve-histogram>
          </standard-card>
        </el-col>
        <el-col :span="5">
          <database-collection-stats-card :collections="['data-trace', 'trace-flow']" ref="databaseStatus"/>
        </el-col>
      </el-row>

      <el-row :gutter="12" class="mt-4">
        <el-col :span="19">
          <standard-card :label="$t('DataTraceLocale.monitoring.statisticsTraceFlowIn24H.title')" icon-class="el-icon-pie-chart">
            <ve-bar :data="statisticsTraceFlowIn24HChartData"
                    :colors="statisticsTraceFlowIn24HChart.colors"
                    :extend="statisticsTraceFlowIn24HChart.extend"></ve-bar>
          </standard-card>
        </el-col>
      </el-row>

    </div>
  </page>
</template>

<script>
import get from 'lodash/get'
import set from 'lodash/set'
import CounterCard from '../../components/card/counter-card'
import PercentCard from '../../components/card/percent-card'
import StandardCard from '../../components/card/standard-card'
import DatabaseCollectionStatsCard from '../../components/card/database-collection-stats-card'
import { SearchCriteria, StatisticsCriteria } from './schema'
import Page from '../Page'
import { Intervals, DateRange } from '../../common'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Monitoring',
  components: { Page, StandardCard, DatabaseCollectionStatsCard, PercentCard, CounterCard },
  data () {
    return {
      Intervals,
      DateRange,
      StatisticsCriteria,
      lastRefreshTime: new Date(),
      refreshTimerService: undefined,
      refreshSetting: {
        interval: 5000,
        autoRefresh: true
      },
      statisticsTimeRecentSetting: {
        dateRange: DateRange[9].value
      },
      statisticsTimeRecentChart: {
        settings: {
          metrics: [SearchCriteria.Type.ERROR, SearchCriteria.Type.WARNING, SearchCriteria.Type.SUCCESS],
          dimension: ['Timestamp']
        },
        colors: ['#DC3545', '#F5A623', '#2BAF2B'],
        extend: {
          series: {
            label: { show: true, position: 'top' }
          }
        }
      },
      statisticsTraceFlowIn24HChart: {
        colors: ['#006BB7', '#DC3545', '#F5A623', '#2BAF2B'],
        extend: {
          series: {
            label: { show: true, position: 'right' }
          }
        }
      }
    }
  },
  async beforeMount () {
    await this.retrieveData()
  },
  watch: {
    refreshSetting: {
      handler (refreshSetting) {
        if (refreshSetting && refreshSetting.interval) {
          clearInterval(this.refreshTimerService)
          this.refreshTimerService = setInterval(this.doRefresh, refreshSetting.interval)
        }
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy () {
    clearInterval(this.refreshTimerService)
  },
  methods: {
    get,
    ...mapActions('dataTrace', [
      'retrieveStatisticsTimeIn24H',
      'retrieveStatisticsTimeRecent',
      'retrieveStatisticsTraceFlowIn24H'
    ]),
    async retrieveData () {
      await this.retrieveStatisticsTimeIn24H()
      await this.$refs.databaseStatus.refresh()
      await this.retrieveStatisticsTimeRecent(new StatisticsCriteria({
        dateRange: this.$moment.rangeFromInterval(
          this.statisticsTimeRecentSettingDateRange.setting.interval,
          this.statisticsTimeRecentSettingDateRange.setting.count,
          new Date()
        ),
        statisticsUnit: this.statisticsTimeRecentSettingDateRange.setting.unit
      }))
      await this.retrieveStatisticsTraceFlowIn24H()
    },
    async doRefresh () {
      if (this.refreshSetting.autoRefresh) {
        this.lastRefreshTime = new Date()
        await this.retrieveData()
      }
    }
  },
  computed: {
    ...mapGetters('dataTrace', [
      'getStatisticsTimeIn24H',
      'getStatisticsTimeRecent',
      'getStatisticsTraceFlowIn24H'
    ]),
    statisticsTrend () {
      return [
        { type: 'danger', startVal: Number(get(this.getStatisticsTimeIn24H, 'ERROR[0].count') / get(this.getStatisticsTimeIn24H, 'TOTAL[0].count') * 100) || 0, endVal: Number(get(this.getStatisticsTimeIn24H, 'ERROR[1].count') / get(this.getStatisticsTimeIn24H, 'TOTAL[1].count') * 100) || 0 },
        { type: 'success', startVal: Number(get(this.getStatisticsTimeIn24H, 'SUCCESS[0].count') / get(this.getStatisticsTimeIn24H, 'TOTAL[0].count') * 100) || 0, endVal: Number(get(this.getStatisticsTimeIn24H, 'SUCCESS[1].count') / get(this.getStatisticsTimeIn24H, 'TOTAL[1].count') * 100) || 0 }
      ]
    },
    statisticsTimeRecentChartData () {
      let rows = []
      if (this.getStatisticsTimeRecent) {
        const dateFormat = this.statisticsTimeRecentSettingDateRange.setting.dateFormat
        rows = Object.values(this.getStatisticsTimeRecent).reduce((pre, group, groupIndex) => {
          let type = Object.keys(this.getStatisticsTimeRecent)[groupIndex]
          if (![SearchCriteria.Type.ERROR, SearchCriteria.Type.WARNING, SearchCriteria.Type.SUCCESS].includes(type)) {
            return pre
          }
          group.forEach((it, index) => {
            set(pre, `[${index}].${type}`, it.count)
            set(pre, `[${index}].Timestamp`, `${this.$moment(it.dateRange.start).format(dateFormat)} - ${this.$moment(it.dateRange.end).format(dateFormat)}`)
          })
          return pre
        }, [])
      }
      return {
        columns: ['Timestamp', SearchCriteria.Type.ERROR, SearchCriteria.Type.WARNING, SearchCriteria.Type.SUCCESS],
        rows
      }
    },
    statisticsTraceFlowIn24HChartData () {
      let rows = []
      if (this.getStatisticsTraceFlowIn24H) {
        rows = Object.keys(this.getStatisticsTraceFlowIn24H).reduce((pre, traceFlowName) => {
          pre.push({ NAME: traceFlowName, ...this.getStatisticsTraceFlowIn24H[traceFlowName] })
          return pre
        }, [])
      }
      return {
        columns: ['NAME', 'TOTAL', SearchCriteria.Type.ERROR, SearchCriteria.Type.WARNING, SearchCriteria.Type.SUCCESS],
        rows
      }
    },
    statisticsTimeRecentSettingDateRange () {
      return DateRange.find(it => it.value === this.statisticsTimeRecentSetting.dateRange)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
