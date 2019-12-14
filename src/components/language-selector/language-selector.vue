<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <span class="flex flex-horizontal align-center cursor-pointer">
      <span :class="$i18n.locale"></span>
      <span class="text-14 ml-4 icon-btn primary">{{ countryLabel }}</span>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="lang in langs" :key="lang.lang" :command="lang.lang" :class="{ 'country-item-selected': $i18n.locale === lang.lang, 'country-item': $i18n.locale !== lang.lang }">
        <div class="flex flex-horizontal align-center justify-space-between cursor-pointer">
          <span :class="lang.lang"></span>
          <span class="text-14 ml-4">{{ lang.label }}</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// import i18n from './../../i18n'

export default {
  name: 'LanguageSelector',
  data () {
    return {
      langs: [
        { label: 'English', lang: 'en' },
        { label: '简体中文', lang: 'zh' }
      ]
    }
  },
  methods: {
    handleCommand (lang) {
      if (this.$i18n.locale !== lang) {
        this.$i18n.locale = lang
      }
    }
  },
  computed: {
    countryLabel () {
      return this.langs.find(lang => lang.lang === this.$i18n.locale).label
    }
  },
  watch: {
    '$i18n.locale' () {
    }
  }
}
</script>

<style scoped lang="scss">
  @import "language-selector";
</style>
