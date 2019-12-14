<template>
  <div class="menu-item-wrapper full-width flex flex-vertical">
    <!-- Menu Label -->
    <div class="menu-item full-width px-6 py-3 cursor-pointer flex flex-horizontal align-center"
         :class="{ selected }"
         :title="$t(route.meta.label)"
         @click="handleMenuItemClick">
      <div class="menu-item-label full-width flex flex-horizontal align-center">
        <i class="menu-item-icon text-20" :class="route.meta.iconClass || 'el-icon-data-line'"></i>
        <transition name="el-fade-in">
          <a href="#" class="menu-item-text-wrapper px-4" v-show="!collapse">
            <span class="menu-item-text text-13 fw-600">{{ $t(route.meta.label) }}</span>
          </a>
        </transition>
      </div>
      <i class="el-icon-arrow-down text-13"
         v-show="!collapse && route.children"
         :class="{ 'collapse': subMenuCollapse }"
      ></i>
    </div>
    <!-- Sub Menu -->
    <transition name="el-zoom-in-top">
      <div class="sub-menu-wrapper full-width pl-4" v-show="!collapse && !subMenuCollapse" v-if="route.children">
        <side-menu-item v-for="child in route.children" :key="child.name" :route="child" :pre-path="routeLink"></side-menu-item>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    disabled: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    route: { type: Object, required: true },
    prePath: { type: String, default: '' }
  },
  data () {
    return {
      subMenuCollapse: false
    }
  },
  methods: {
    handleMenuItemClick () {
      if (this.route.children) {
        this.subMenuCollapse = !this.subMenuCollapse
      } else if (!this.selected) {
        this.$router.push(this.routeLink)
      }
    }
  },
  computed: {
    routeLink () {
      return `${this.prePath}/${this.route.path}`
    },
    selected () {
      return this.$route.fullPath === this.routeLink || this.$route.fullPath.startsWith(`${this.routeLink}/`)
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-item {
    @include transition(all);
    box-sizing: border-box;
    .menu-item-label {
      overflow: hidden;
    }
    .menu-item-icon {
      flex-shrink: 0;
      line-height: 22px;
      color: $-side-menu-icon-color
    }
    .menu-item-text-wrapper {
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .menu-item-text {
        color: $-side-menu-text-color
      }
    }
    .el-icon-arrow-down {
      @include transition(all);
      &.collapse {
        transform: rotate(-90deg);
      }
    }
    &:hover {
      .menu-item-icon, .menu-item-text {
        color: $-side-menu-active-color
      }
    }
    &.selected {
      .menu-item-icon, .menu-item-text {
        color: $-side-menu-selected-color
      }
    }
  }
  .sub-menu-wrapper {
    box-sizing: border-box;
  }
</style>
