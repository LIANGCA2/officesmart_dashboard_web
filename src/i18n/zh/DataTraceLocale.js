export default {
  traceFlowManagement: {
    columns: {
      id: '唯一标识',
      name: '名称',
      description: '描述',
      bizKeys: '业务标识',
      createdDate: '创建日期',
      lastModifiedDate: '最后更新日期'
    },
    actions: {
      create: '新建',
      remove: '删除',
      modify: '修改',
      addBizKey: '添加业务标识'
    },
    dialogs: {
      create: { title: '新建追溯流程' },
      delete: { message: '追溯流程 {traceFlowName} 和其相关的日志都将被删除，您确认删除吗？' },
      edit: { title: '编辑追溯流程' }
    }
  },
  tracing: {
    searchCriteria: {
      traceId: '追溯唯一标识',
      traceFlow: '追溯流程',
      status: '状态',
      includeTypes: '包含类型',
      createdDate: '创建日期范围',
      lastModifiedDate: '最后修改日期范围',
      startDateTime: '开始时间',
      endDateTime: '结束时间',
      bizKey: '业务标识'
    },
    actions: {
      addBizKey: '添加业务标识',
      search: '搜索'
    },
    tips: {
      searchSummary: '搜索到 {traceFlowCount} 个追溯流程, 共 {dataTraceCount} 条记录, 耗时 {useTime} s',
      traceFlowSummary: '{traceFlowName} - {dataTraceCount} 条记录'
    },
    columns: {
      id: '唯一标识',
      traceId: '追溯唯一标识',
      latestMilestone: '最新里程碑',
      exceptionMessage: '异常信息',
      status: '状态',
      createdDate: '创建日期',
      lastModifiedDate: '最后更新日期'
    },
    dialogs: {
      traceLogDetails: {
        timestamp: '发生时间：',
        exceptionMessage: '异常信息：',
        exceptionStackTrace: '异常堆栈踪迹：'
      }
    }
  },
  monitoring: {
    refreshSetting: {
      interval: '每隔',
      autoRefresh: '自动刷新',
      lastRefreshTime: '上次刷新'
    },
    statisticsTimeIn24H: {
      TOTAL: '过去 24h 总量',
      ERROR: '异常',
      WARNING: '警告',
      SUCCESS: '成功',
      STATISTICS: '统计'
    },
    statisticsTimeRecent: {
      title: '过去 {recent} 统计图表',
      setting: {
        dateRangeAndUnit: '时间范围和统计单位'
      }
    },
    statisticsTraceFlowIn24H: {
      title: '过去 24h 追溯流程统计图表'
    }
  }
}
