import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    containers: []
  },
  mutations: {
      updateContainers(state, payload) {
          state.containers = payload
      }
  },
  actions: {
      updateContainersAsync: ({ commit }, payload) => commit('updateContainers', payload)
  },
  getters: {
      getContainerByOwner: (state) => (owner) => {
          return state.containers.find(container => container.Name === owner)
      },
      getAllContainers: state => {
          return state.containers
      }
  }
})
