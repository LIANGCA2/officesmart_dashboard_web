<template>
  <div class="page full-container">
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp" mode="out-in">
      <header class="full-width flex flex-horizontal justify-space-between align-center header-limit border-box white-text px-6 py-2" v-show="showHeaderLimit">
        <slot name="header-limit-title">
          <h2 class="fw-400 text-16">
            <i v-if="$route.meta.iconClass" :class="$route.meta.iconClass" class="mr-4"></i>
            <span>{{ $t($route.meta.label) }}</span>
          </h2>
        </slot>
        <slot name="header-limit-actions"></slot>
      </header>
    </transition>
    <vue-scroll :ops="{ scrollPanel: { scrollingX: false }, bar: { background: '#b8bdc6', keepShow: true, size: '4px' }, rail: { gutterOfSide: '0px' }, vuescroll: { wheelScrollDuration: 300 } }"
                @handle-scroll="handleScroll">
      <header ref="header" class="header flex flex-horizontal justify-space-between align-center border-box px-6 pt-6">
        <slot name="header-title">
          <h2 class="fw-400 mb-4 text-23">
            <i v-if="$route.meta.iconClass" :class="$route.meta.iconClass" class="mr-4"></i>
            <span>{{ $t($route.meta.label) }}</span>
          </h2>
        </slot>
        <slot name="header-actions"></slot>
      </header>
      <div class="full-width border-box px-6 pb-6">
        <slot></slot>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data () {
    return {
      showHeaderLimit: false
    }
  },
  methods: {
    handleScroll ({ scrollTop }) {
      this.showHeaderLimit = (scrollTop > this.$refs.header.offsetHeight)
    }
  }
}
</script>

<style scoped lang="scss">
  .page {
    position: relative;
    .header-limit {
      z-index: 99;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba($-info-color-, .7);
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, .1);
    }
  }
</style>
