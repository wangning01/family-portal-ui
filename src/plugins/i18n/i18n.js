import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from '@/lang/en.json'
import fr from '@/lang/fr.json'
Vue.use(VueI18n)

const locales = {
  en: en,
  fr: fr
}

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: locales.en
  }
}
)

export default i18n
