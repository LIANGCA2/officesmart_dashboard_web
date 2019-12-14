<template>
  <div id="side-menu-wrapper">
    <div id="side-menu-bg" class="full-container"></div>
    <vue-scroll :ops="{ scrollPanel: { scrollingX: false }, bar: { background: '#dbe0e9', keepShow: true, size: '4px' }, rail: { gutterOfSide: '0px' }, vuescroll: { wheelScrollDuration: 300 } }">
      <nav id="side-menu" class="flex flex-vertical full-container py-6" :class="{ 'collapse': collapse }">
        <side-menu-item v-for="child in $router.options.routes.find(r => r.name === 'main').children"
                        :key="child.name"
                        :route="child"
                        :collapse="collapse"></side-menu-item>
      </nav>
    </vue-scroll>
  </div>
</template>

<script>
import SideMenuItem from './SideMenuItem'
export default {
  name: 'SideMenu',
  components: { SideMenuItem },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  #side-menu-wrapper {
    position: relative;
    #side-menu-bg {
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient($-side-menu-background-color), url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    #side-menu {
      &.collapse {
        align-items: center;
      }
    }
  }
</style>
