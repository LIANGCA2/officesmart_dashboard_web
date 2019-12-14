'use strict'

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('./en').default,
    ...elementEnLocale
  },
  zh: {
    ...require('./zh').default,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
