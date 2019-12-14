<template>
  <el-card>
    <div class="flex flex-vertical">
      <p class="flex flex-horizontal align-center standard-text text-20">
        <i :class="iconClass"></i>
        <span class="ml-4">{{ label }}</span>
      </p>
      <div class="flex flex-horizontal justify-center">
        <div class="flex flex-horizontal align-center" v-for="(value, index) in values" :key="index">
          <count-to
            :decimals="1"
            :startVal="value.startVal || 0"
            :endVal="value.endVal || 0"
            :duration="duration"
            :class="`${value.type || 'primary'}-text`"
            class="text-42 text-align-center py-2 inline-text fw-600">
          </count-to>
          <div class="flex flex-vertical align-center">
            <i :class="[ `${convertTypeForTrendIcon(value.type)[value.endVal - value.startVal >= 0 ? 'up' : 'down']}-text`, ...value.endVal - value.startVal >= 0 ? '': 'trend-down' ]" class="el-icon-caret-top text-20" style="line-height: 12px"></i>
            <span class="text-26 light-text ml-1" style="line-height: 26px">%</span>
          </div>
          <span class="divider mx-4" v-if="index < values.length - 1"></span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import countTo from 'vue-count-to'

export default {
  name: 'PercentCard',
  components: { countTo },
  props: {
    label: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: 'el-icon-s-data'
    },
    values: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  methods: {
    convertTypeForTrendIcon (type) {
      switch (type) {
        case 'danger':
          return { up: 'danger', down: 'success' }
        default:
          return { up: 'success', down: 'danger' }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .divider {
    width: 1px;
    height: 80%;
    background: $-line-color-;
    display: block;
  }
  .el-icon-caret-top {
    @include transition(all);
  }
  .trend-down {
    transform: rotate(180deg);
  }
</style>
