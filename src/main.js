import Vue from 'vue'
import './plugins/vuetify'
import './plugins/konami'
import App from './App.vue'
import router from './router'
import store from './store'
import fileManager from './plugins/kite/filemanager'
import containers from './plugins/kite/containers'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  fileManager,
  containers,
  render: h => h(App)
}).$mount('#app')
