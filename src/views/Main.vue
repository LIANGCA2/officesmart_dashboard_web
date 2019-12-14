<template>
  <div id="application" class="full-container" ref="application">
    <header id="application-header" class="full-width flex flex-horizontal align-center px-6">
      <div id="application-header-left" class="full-height flex flex-horizontal align-center">
        <el-button type="text" @click="isCollapse = !isCollapse">
          <i class="iconfont icon-menu text-20 primary icon-btn"></i>
        </el-button>
        <span class="divider mx-6"></span>
        <a href="#"><i id="logo"></i></a>
      </div>
      <div id="application-header-right" class="full-height flex flex-horizontal align-center">
        <el-tooltip class="item" content="全屏" placement="bottom">
          <el-button type="text" @click="toggleFullScreen">
            <i class="iconfont icon-quanping text-20 primary icon-btn"></i>
          </el-button>
        </el-tooltip>
        <span class="divider mx-6"></span>
        <el-tooltip class="item" content="搜索" placement="bottom">
          <el-button type="text">
            <i class="iconfont icon-sousuo text-20 primary icon-btn"></i>
          </el-button>
        </el-tooltip>
        <span class="divider mx-6"></span>
        <el-tooltip class="item" content="通知" placement="bottom">
          <el-button type="text">
            <i class="iconfont icon-lingdang text-20 primary icon-btn"></i>
          </el-button>
        </el-tooltip>
        <span class="divider mx-6"></span>
        <language-selector></language-selector>
        <span class="divider mx-6"></span>
        <el-dropdown>
          <div id="header-avator-wrapper" class="flex flex-horizontal align-center">
            <el-avatar src="https://cdn.vuetifyjs.com/images/john.jpg"></el-avatar>
            <span class="ml-4 important-text text-16">Tony Ma</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div id="application-main-wrapper" class="full-width">
      <aside id="application-aside" class="full-height" :class="{ 'collapse': hasCollapseClass }" @mouseenter="handleAsideMouseEnter" @mouseleave="handleAsideMouseLeave">
        <side-menu class="full-container" :collapse="hasCollapseClass"></side-menu>
      </aside>
      <div id="application-main" class="full-container" :class="{ 'collapse': hasCollapseClass }">
        <!--<div class="full-width px-6 py-4" style="box-sizing: border-box">-->
          <!--<el-breadcrumb  separator=" / ">-->
            <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
          <!--</el-breadcrumb>-->
        <!--</div>-->
        <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut" mode="out-in">
          <router-view/>
        </transition>
        <vue-progress-bar></vue-progress-bar>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/side-menu/index'
import LanguageSelector from '../components/language-selector/language-selector'

export default {
  name: 'Main',
  components: {
    LanguageSelector,
    SideMenu
  },
  data () {
    return {
      isCollapse: false,
      isAsidePreview: false,
      asidePreviewTimeout: undefined,
      isFullScreen: false
    }
  },
  methods: {
    toggleFullScreen () {
      this.$fullscreen.toggle(this.$refs.application, {
        wrap: false,
        callback: isFullScreen => { this.isFullScreen = isFullScreen }
      })
    },
    clearAsidePreviewTimeout () {
      clearTimeout(this.asidePreviewTimeout)
      this.asidePreviewTimeout = undefined
    },
    handleAsideMouseEnter () {
      this.asidePreviewTimeout = setTimeout(() => {
        this.isAsidePreview = true
        this.clearAsidePreviewTimeout()
      }, 500)
    },
    handleAsideMouseLeave () {
      this.clearAsidePreviewTimeout()
      this.isAsidePreview = false
    }
  },
  computed: {
    hasCollapseClass () {
      return this.isCollapse && !this.isAsidePreview
    }
  }
}
</script>

<style scoped lang="scss">
  #application {
    #application-header {
      height: $-header-height-;
      background: white;
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, .1);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      justify-content: space-between;
      box-sizing: border-box;
      .divider {
        width: 1px;
        height: calc(100% - 22px);
        background: $-line-color-;
        display: block;
      }
      #application-header-left {
        #logo {
          width: 192px;
          height: 42px;
          display: block;
          background: url("../assets/images/logo.png") no-repeat center;
          background-size: cover;
        }
      }
      .application-header-right {
      }
    }
    #application-main-wrapper {
      position: absolute;
      top: $-header-height-;
      left: 0;
      height: calc(100% - #{$-header-height-});
      background: $-background-color-;
      #application-aside {
        @include transition(width);
        width: $-aside-width-;
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, .1);
        &.collapse {
          width: $-aside-min-width-;
        }
      }
      #application-main {
        @include transition(padding);
        padding-left: $-aside-width-;
        overflow-y: auto;
        &.collapse {
          padding-left: $-aside-min-width-;
        }
      }
    }
  }
</style>
