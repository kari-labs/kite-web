import Vue from 'vue'
import FileManager from './filemanager'

Vue.use(FileManager, {
    api_url: 'https://localhost/'
})

export default new FileManager()