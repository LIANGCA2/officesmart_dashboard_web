<template>
  <div class="full-container">
    <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">

</style>
