<template>
  <el-card shadow="hover" :body-style="{ padding: '0' }">
    <header class="flex flex-horizontal align-center justify-space-between px-4 py-3 border-box">
      <div class="text-15 standard-text">
        <i :class="iconClass" class="mr-2"></i>
        <span>{{ label }}</span>
      </div>
      <slot name="header-actions"></slot>
    </header>
    <span class="divider"></span>
    <div class="border-box px-4 py-3">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'StandardCard',
  props: {
    iconClass: {
      type: String,
      default: 'el-icon-stopwatch'
    },
    label: {
      type: String,
      default: ''
    },
    autoRefresh: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    doRefresh: {
      type: Function
    }
  },
  data () {
    return {
      timerService: undefined
    }
  },
  methods: {
    refresh () {
      if (this.doRefresh && this.autoRefresh) {
        this.doRefresh()
      }
    }
  },
  beforeMount () {
    if (this.interval && this.interval > 0) {
      this.timerService = setInterval(this.refresh, this.interval)
    }
  },
  beforeDestroy () {
    if (this.timerService) {
      clearInterval(this.timerService)
    }
  },
  watch: {
    interval: {
      handler (interval) {
        if (interval && interval > 0 && interval !== this.interval) {
          if (this.timerService) {
            clearInterval(this.timerService)
          }
          this.timerService = setInterval(this.refresh, interval)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  .divider {
    width: 100%;
    height: 1px;
    background: $-line-color-;
    display: block;
  }
</style>
