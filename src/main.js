// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'hover.css/css/hover-min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import i18n from '@/plugins/i18n/i18n.js'
import store from '@/plugins/store/store.js'
import ActionOnVideoDialog from '@/plugins/actionOnVideoDialog.js'
import ConfirmDialog from '@/plugins/confirmDialog.js'
import EditVideoDialog from '@/plugins/editVideoDialog.js'
import AddToPlayListDialog from '@/plugins/addToPlayListDialog.js'
import PlayVideoList from '@/plugins/playVideoList.js'
import CreateNewPlaylist from '@/plugins/createNewPlaylist.js'
import VeeValidate from 'vee-validate'
import mixin from '@/plugins/mixin/mixin.js'
import VueYoutube from 'vue-youtube' 
// import YoutubeVue from 'youtube-vue'
import VuePlayerPlugin, { Player } from 'vue-youtube-iframe-api'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md' || 'mdi'
})
Vue.use(VeeValidate)
// Vue.use(Vuex)
Vue.use(VueYoutube)
// Vue.use(YoutubeVue)
Vue.use(VuePlayerPlugin)
Vue.component('yt-player', Player)
Vue.use(ActionOnVideoDialog)
Vue.use(ConfirmDialog)
Vue.use(EditVideoDialog)
Vue.use(AddToPlayListDialog)
Vue.use(PlayVideoList)
Vue.use(CreateNewPlaylist)
Vue.mixin(mixin)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  i18n,
  store
})
