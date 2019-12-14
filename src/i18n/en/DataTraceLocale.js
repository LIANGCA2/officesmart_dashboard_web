export default {
  traceFlowManagement: {
    columns: {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      bizKeys: 'Biz Keys',
      createdDate: 'Created Date',
      lastModifiedDate: 'Last Modified Date'
    },
    actions: {
      create: 'Create',
      remove: 'Remove',
      modify: 'Modify',
      addBizKey: 'Add Biz Key'
    },
    dialogs: {
      create: { title: 'Create Trace Flow' },
      delete: { message: 'Trace flow {traceFlowName} and associated logs will be also delete, do you want to delete?' },
      edit: { title: 'Edit Trace Flow' }
    }
  },
  tracing: {
    searchCriteria: {
      traceId: 'Trace ID',
      traceFlow: 'Trace Flow',
      status: 'Status',
      includeTypes: 'Include Types',
      createdDate: 'Created Date',
      lastModifiedDate: 'Last Modified Date',
      startDateTime: 'Start Date Time',
      endDateTime: 'End Date Time',
      bizKey: 'Biz Key'
    },
    actions: {
      addBizKey: 'Add Biz Key',
      search: 'Search'
    },
    tips: {
      searchSummary: '{traceFlowCount} Trace Flows, {dataTraceCount} Results in {useTime} s',
      traceFlowSummary: '{traceFlowName} - {dataTraceCount} Results'
    },
    columns: {
      id: 'ID',
      traceId: 'Trace ID',
      latestMilestone: 'Latest Milestone',
      exceptionMessage: 'Exception Message',
      status: 'Status',
      createdDate: 'Created Date',
      lastModifiedDate: 'Last Modified Date'
    },
    dialogs: {
      traceLogDetails: {
        timestamp: 'Timestamp:',
        exceptionMessage: 'Exception Message:',
        exceptionStackTrace: 'Exception Stack Trace:'
      }
    }
  },
  monitoring: {
    refreshSetting: {
      interval: 'Interval',
      autoRefresh: 'Auto Refresh',
      lastRefreshTime: 'Last Refresh Time'
    },
    statisticsTimeIn24H: {
      TOTAL: 'Last 24h Total',
      ERROR: 'Error',
      WARNING: 'Warning',
      SUCCESS: 'Success',
      STATISTICS: 'Statistics'
    },
    statisticsTimeRecent: {
      title: 'Last {recent} Statistics Chart',
      setting: {
        dateRangeAndUnit: 'Date Range & Unit'
      }
    },
    statisticsTraceFlowIn24H: {
      title: 'Last 24h Trace Flow Statistics Chart'
    }
  }
}
