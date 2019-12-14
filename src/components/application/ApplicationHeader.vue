<template>
  <header class="application-header flex flex-horizontal">
    <div class="header-left">
      <el-button type="text" @click="handleFoldButtonClick">
        <i class="md-text icon-btn primary" :class="{ 'el-icon-s-unfold': isFold, 'el-icon-s-fold': !isFold }"></i>
      </el-button>
      <img src="@/assets/logo.png" alt="OfficeSmart Dashboard"/>
    </div>
    <div class="header-right">RIGHT</div>
  </header>
</template>

<script>
export default {
  name: 'ApplicationHeader',
  data () {
    return {
      isFold: false
    }
  },
  methods: {
    handleFoldButtonClick () {
      this.isFold = !this.isFold
      this.$emit('fold-button-click', this.isFold)
    }
  }
}
</script>

<style scoped lang="scss">
  .application-header {
    width: 100%;
    height: $-header-height-;
    background: #FFF;
    box-sizing: border-box;
    border-bottom: 1px solid $-line-color-;
    justify-content: space-between;
    padding: 0 12px;
    .header-left {
      display: flex;
      align-items: center;
      .icon-btn {
        margin-right: 12px;
      }
    }
  }
</style>
