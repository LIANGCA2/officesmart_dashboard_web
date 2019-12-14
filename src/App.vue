<template>
  <div id="application-root" class="full-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Application',
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    min-width: $-min-page-width-;
    min-height: $-min-page-height-;
    font-family: $-font-family-;
    a { text-decoration: none; }
  }
</style>

<style lang="scss" scoped>
  #application-root {
    position: relative
  }
</style>
