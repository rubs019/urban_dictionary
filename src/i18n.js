import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store  from "./store"

Vue.use(VueI18n)

export default new VueI18n({
  locale: Store.language || 'fr',
  fallbackLocale: Store.language || 'fr',
  messages: require('./locales/languages')
})
