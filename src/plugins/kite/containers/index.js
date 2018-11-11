import Vue from 'vue'
import Containers from './containers'

Vue.use(Containers, {
    api_url: 'https://localhost/'
})

export default new Containers()