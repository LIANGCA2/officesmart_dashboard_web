<template>
  <page>
    <div id="tracing" class="full-container" v-loading="isLoading">
      <el-form inline size="mini" class="white-bg br-3 line-border-1 px-4 py-4 border-box">
        <el-row>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.traceId')">
            <el-input v-model="searchCriteria.traceId" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.traceFlow')">
            <el-select v-model="searchCriteria.traceFlowId" clearable>
              <el-option
                v-for="traceFlow in getTraceFlows"
                :key="traceFlow.id"
                :label="traceFlow.name"
                :value="traceFlow.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.status')">
            <el-checkbox-group v-model="searchCriteria.status" size="mini">
              <el-checkbox v-for="key in Object.keys(SearchCriteria.Status)" :label="SearchCriteria.Status[key]" :key="key" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.includeTypes')">
            <el-checkbox-group v-model="searchCriteria.includeTypes" size="mini">
              <el-checkbox v-for="key in Object.keys(SearchCriteria.Type)" :label="SearchCriteria.Type[key]" :key="key" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <transition-group name="fade" mode="out-in">
            <el-form-item v-for="(bizKey, index) in searchCriteria.bizKeys" :key="bizKey._id" :label="`${$t('DataTraceLocale.tracing.searchCriteria.bizKey')} ${index + 1}`">
              <el-row :gutter="12">
                <el-col :span="11">
                  <el-select v-model="bizKey.key" filterable allow-create clearable default-first-option>
                    <el-option
                      v-for="bizKey in availableBizKeys"
                      :key="bizKey"
                      :label="bizKey"
                      :value="bizKey">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="11"><el-input placeholder="Value" v-model="bizKey.value" clearable></el-input></el-col>
                <el-col :span="2" v-if="searchCriteria.bizKeys.length > 1">
                  <el-button type="text" @click="searchCriteria.bizKeys.splice(index, 1)">
                    <i class="el-icon-circle-close text-16 danger icon-btn"></i>
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </transition-group>
        </el-row>
        <el-row>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.createdDate')">
            <el-date-picker
              v-model="searchCriteria.createdDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              :start-placeholder="$t('DataTraceLocale.tracing.searchCriteria.startDateTime')"
              :end-placeholder="$t('DataTraceLocale.tracing.searchCriteria.endDateTime')"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.tracing.searchCriteria.lastModifiedDate')">
            <el-date-picker
              v-model="searchCriteria.lastModifiedDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              :start-placeholder="$t('DataTraceLocale.tracing.searchCriteria.startDateTime')"
              :end-placeholder="$t('DataTraceLocale.tracing.searchCriteria.endDateTime')"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="info" icon="el-icon-plus" plain
                     @click="searchCriteria.bizKeys.push({ _id: shortid.generate(), key: '', value: '' })">{{ $t('DataTraceLocale.tracing.actions.addBizKey') }}</el-button>
          <el-button type="primary" icon="el-icon-search" @click="search">{{ $t('DataTraceLocale.tracing.actions.search') }}</el-button>
        </el-form-item>
      </el-form>
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOut" mode="out-in">
        <div class="full-width" v-if="searchResult">
          <el-divider content-position="left">
            {{ $t('DataTraceLocale.tracing.tips.searchSummary', { traceFlowCount: Object.keys(searchResult).length, dataTraceCount: Object.keys(searchResult).reduce((s, k) => s += searchResult[k].length, 0), useTime: searchUseTime / 1000 })}}
          </el-divider>
          <el-card v-for="(dataTraces, traceFlowId) in searchResult" :key="traceFlowId" class="mb-4">
            <div class="flex flex-horizontal align-center mb-4" :title="get(getTraceFlows.find(t => t.id === traceFlowId), 'description', $t('DefaultLocale.unknown'))">
              <i class="primary-text iconfont icon-ico_zhuizon mr-4"></i>
              <div class="flex flex-vertical">
                <p class="primary-text text-14">
                  {{ $t('DataTraceLocale.tracing.tips.traceFlowSummary', { traceFlowName: get(getTraceFlows.find(t => t.id === traceFlowId), 'name', $t('DefaultLocale.unknown')), dataTraceCount: dataTraces.length }) }}
                </p>
                <p class="light-text text-12 mt-1" v-if="currentSearchResultBizKeys.length > 0">
                  <el-tag :key="biz.key" v-for="biz in currentSearchResultBizKeys" :disable-transitions="false" class="mr-4" size="mini" type="info">
                    {{ biz.key }} = {{ biz.value }}
                  </el-tag>
                </p>
              </div>
            </div>
            <el-table :data="dataTraces" class="full-width" size="small">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="flex flex-horizontal mb-4">
                    <el-tag :key="bizKey" v-for="bizKey in Object.keys(props.row.bizKeys)" :disable-transitions="false"
                            class="mr-4 cursor-pointer" size="mini" @click="copyToClipboard(props.row.bizKeys[bizKey])">
                      {{ bizKey }} = {{ props.row.bizKeys[bizKey] }}
                    </el-tag>
                  </div>
                  <div class="full-width flex flex-horizontal" style="flex-wrap: wrap">
                    <div v-for="(traceLog, index) in props.row.traceLogs" :key="traceLog.timestamp" class="flex mb-3">
                      <div class="flex flex-horizontal align-center border-box br-3 px-4 py-2"
                           :class="{ [getBackgroundClassNameByType(traceLog.type)]: true, 'cursor-pointer': traceLog.exMessage || traceLog.exStackTrace }"
                           @click="openTraceLogDialog(traceLog)">
                        <span class="text-26 mr-3 standard-text">{{ index + 1 }}</span>
                        <div class="flex flex-vertical">
                          <span class="mb-1">{{ traceLog.milestoneName }}</span>
                          <span>{{ $moment(traceLog.timestamp).defaultFormat() }}</span>
                        </div>
                        <el-button type="text" v-if="traceLog.originalMsgIViewPath" @click="new IViewFile({ filePath: traceLog.originalMsgIViewPath }).download()">
                          <i class="ml-3 el-icon-download text-20 primary icon-btn"></i>
                        </el-button>
                      </div>
                      <div v-if="index < props.row.traceLogs.length - 1" class="mx-4 px-2 flex flex-vertical align-center">
                        <i class="el-icon-right text-15 light-text"></i>
                        <span>{{ (new Date(props.row.traceLogs[index + 1].timestamp).getTime() - new Date(traceLog.timestamp).getTime()) / 1000 }}s</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="id" :label="$t('DataTraceLocale.tracing.columns.id')" width="200"></el-table-column>
              <el-table-column prop="traceId" :label="$t('DataTraceLocale.tracing.columns.traceId')" width="200">
                <template slot-scope="scope">
                  <div class="cursor-pointer br-3" :class="getBackgroundClassNameByType(scope.row.status)" @click="copyToClipboard(scope.row.traceId)">{{ scope.row.traceId }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('DataTraceLocale.tracing.columns.latestMilestone')">
                <template slot-scope="scope">
                  <el-tooltip effect="light" :content="scope.row.traceLogs[scope.row.traceLogs.length - 1].milestoneName" :open-delay="500">
                    <p class="full-width text-12 inline-text">{{ scope.row.traceLogs[scope.row.traceLogs.length - 1].milestoneName }}</p>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column :label="$t('DataTraceLocale.tracing.columns.exceptionMessage')">
                <template slot-scope="scope">
                  <el-tooltip effect="light" :open-delay="500">
                    <div slot="content" style="max-width: 500px;">
                      {{ scope.row.traceLogs[scope.row.traceLogs.length - 1].exMessage }}
                    </div>
                    <p class="full-width text-12 inline-text">{{ scope.row.traceLogs[scope.row.traceLogs.length - 1].exMessage }}</p>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column :label="$t('DataTraceLocale.tracing.columns.status')" width="150">
                <template slot-scope="scope">
                  <div class="flex flex-horizontal" style="flex-wrap: wrap">
                    <p class="text-12 px-2 mr-1 br-3"
                       :class="[getBackgroundClassNameByType(traceLog.type), ...scope.row.traceLogs.length > 5 ? 'mb-2' : '']"
                       v-for="(traceLog, index) in scope.row.traceLogs"
                       :key="`${scope.row.id}-${index}`">{{ index + 1 }}
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('DataTraceLocale.tracing.columns.createdDate')" width="160">
                <template slot-scope="scope">
                  <span>{{ $moment(scope.row.createdDate).defaultFormat() }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('DataTraceLocale.tracing.columns.lastModifiedDate')" width="160">
                <template slot-scope="scope">
                  <span>{{ $moment(scope.row.lastModifiedDate).defaultFormat() }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </transition>

      <el-dialog :title="`${currentViewTraceLog.milestoneName}`" :visible.sync="dialogVisible.traceLog" width="50%">
        <p class="text-13 mb-2">
          <span class="primary-text mr-2">{{ $t('DataTraceLocale.tracing.dialogs.traceLogDetails.timestamp') }}</span>
          <span class="light-text">{{ currentViewTraceLog.timestamp }}</span>
        </p>
        <p class="text-13 primary-text">{{ $t('DataTraceLocale.tracing.dialogs.traceLogDetails.exceptionMessage') }}</p>
        <pre class="text-13 standard-text mb-2" style="max-height: 220px; overflow-y: auto">{{ currentViewTraceLog.exMessage }}</pre>
        <p class="text-13 primary-text">{{ $t('DataTraceLocale.tracing.dialogs.traceLogDetails.exceptionStackTrace') }}</p>
        <pre class="text-13 standard-text" style="max-height: 220px; overflow-y: auto">{{ currentViewTraceLog.exStackTrace }}</pre>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible.traceLog = false">{{ $t('DefaultLocale.actions.close') }}</el-button>
      </span>
      </el-dialog>
    </div>
  </page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ConvertChain } from '../../plugins/http'
import { SearchCriteria, SearchCriteriaConverter, IViewFile } from './schema'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import concat from 'lodash/concat'
import uniq from 'lodash/uniq'
import { copyToClipboard } from '../../utils/CommonUtil'
import Page from '../Page'
const shortid = require('shortid')

export default {
  name: 'Tracing',
  components: { Page },
  computed: {
    ...mapGetters('traceFlow', [
      'getTraceFlows'
    ]),
    availableBizKeys () {
      return uniq(get(this, 'getTraceFlows', []).map(it => get(it, 'bizKeys', [])).reduce((pre, cur) => concat(pre, cur)))
    },
    currentSearchResultBizKeys () {
      return get(this.searchCriteriaForCurrentSearchResult, 'bizKeys', []).filter(it => it.key && it.value)
    },
    pickerOptions () {
      return {
        shortcuts: [
          {
            text: this.$t('DefaultLocale.date.lastDay'),
            onClick: picker => (picker.$emit('pick', this.$moment.rangeFromInterval('day', -1, Date.now()).toDate()))
          },
          {
            text: this.$t('DefaultLocale.date.lastWeek'),
            onClick: picker => (picker.$emit('pick', this.$moment.rangeFromInterval('week', -1, Date.now()).toDate()))
          },
          {
            text: this.$t('DefaultLocale.date.lastMonth'),
            onClick: picker => (picker.$emit('pick', this.$moment.rangeFromInterval('month', -1, Date.now()).toDate()))
          },
          {
            text: this.$t('DefaultLocale.date.lastThreeMonth'),
            onClick: picker => (picker.$emit('pick', this.$moment.rangeFromInterval('month', -3, Date.now()).toDate()))
          }
        ]
      }
    }
  },
  async beforeMount () {
    await this.retrieveTraceFlows()
  },
  data () {
    return {
      dialogVisible: {
        traceLog: false
      },
      searchCriteria: {
        traceId: '',
        traceFlowId: '',
        status: Object.values(SearchCriteria.Status),
        includeTypes: Object.values(SearchCriteria.Type),
        bizKeys: [{ _id: shortid.generate(), key: '', value: '' }],
        createdDate: [],
        lastModifiedDate: []
      },
      searchCriteriaForCurrentSearchResult: undefined,
      searchResult: undefined,
      searchUseTime: 0,
      currentViewTraceLog: {},
      isLoading: false,
      shortid,
      copyToClipboard,
      IViewFile,
      SearchCriteria
    }
  },
  methods: {
    ...mapActions('traceFlow', [
      'retrieveTraceFlows'
    ]),
    async search () {
      this.isLoading = true
      this.searchResult = undefined
      await this.$nextTick()
      const response = await this.$api.dataTrace.findAllBySearchCriteria(this.searchCriteria, {
        dataConvertChain: new ConvertChain({
          converters: [ SearchCriteriaConverter ]
        }),
        responseDataConvertChain: new ConvertChain({
          converters: [ SearchCriteriaConverter ]
        })
      })
      this.searchResult = response.responseData.data
      this.searchCriteriaForCurrentSearchResult = cloneDeep(this.searchCriteria)
      this.searchUseTime = response.useTime
      this.isLoading = false
    },
    getBackgroundClassNameByType (type) {
      switch (type) {
        case 'SUCCESS':
          return 'success-row'
        case 'WARNING':
          return 'warning-row'
        case 'ERROR':
          return 'danger-row'
        case 'INFO':
          return 'info-row'
      }
    },
    openTraceLogDialog (traceLog) {
      if (traceLog.exMessage || traceLog.exStackTrace) {
        this.currentViewTraceLog = traceLog
        this.dialogVisible.traceLog = true
      }
    },
    get
  }
}
</script>

<style scoped lang="scss">
</style>
