import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import './vuetify.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#182D72',
    secondary: '#FCB741',
    accent: '#f8f8FF',

    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'fa',
})
