<template>
  <el-card :class="`${type}-gradient-bg`">
    <div class="flex flex-vertical">
      <p class="flex flex-horizontal align-center white-text text-20">
        <i :class="iconClass"></i>
        <span class="ml-4 inline-text">{{ label }}</span>
      </p>
      <count-to
        :startVal="startVal"
        :endVal="endVal"
        :duration="duration"
        class="text-42 white-text text-align-center py-2 inline-text fw-600">
      </count-to>
    </div>
  </el-card>
</template>

<script>
import countTo from 'vue-count-to'

export default {
  name: 'CounterCard',
  components: { countTo },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: 'el-icon-warning-outline'
    },
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1000
    }
  }
}
</script>

<style scoped lang="scss">

</style>
