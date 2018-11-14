import Vue from 'vue'
import Vuex from 'vuex'
import Kite from '@/mixins/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentContainer: '',
    containers: []
  },
  mutations: {
      updateContainers(state, containerList) {
          state.containers = containerList
      },
      setCurrentContainer(state, containerID) {
          state.containers = containerID
      },
      appendContainer(state, containerObject) {
          state.containers.push(containerObject)
      }
  },
  actions: {
    updateContainersAsync: ({commit}) => {
        return new Promise((resolve, reject) => {
            const headers = new Headers()
            const init = {
                method: 'GET',
                headers,
                mode: 'cors',
                cache: 'no-store'
            }
            
            let request = new Request(`${Kite}api/docker`, init)

            fetch(request).then(response => {
                // Check if response is okay and return data in JSON if true
                if(response.ok) return response.json()
                // If response not okay, reject the Promise with HTTP Status Code
                else reject(response.status)
            // This is where we filter some of the input out for better results
            // on the frontend
            }).then(parsedData => {
                // Perform data filtering on the JSON data
                parsedData.forEach((element, elementIndex) => {
                    let containerName = element.Name
                    let containerStartTime = element.State.StartedAt

                    // Filter out the junk Docker puts with the container name
                    // We are filtering out the prefixed '/' and the postfixed 'php'
                    // Use the first Regex result as we are evaluating each element separately
                    containerName = containerName.match(/\b\d+/)[0]
                    
                    // Convert the Container Start Time from a UTC date string to a
                    // Localized JavaScript Date object string
                    containerStartTime = new Date(containerStartTime).toLocaleString()

                    // Overwrite the parsedData with out new filtered data then repeat
                    parsedData[elementIndex].Name = containerName
                    parsedData[elementIndex].State.StartedAt = containerStartTime
                })

                // Return new parsedData to next Promise
                return parsedData
            }).then(filteredData => {
                // Commit to mutation
                commit('updateContainers', filteredData)

                // Resolve our completed promise
                resolve()
            // Catch any errors while retrieving API data
            // such as an inability to connect to the server
            }).catch(error => reject(error))
        })
    },
    // Get a container object from the API then append it to
    // the containers array mutation.
    getSingleContainerAsync: ({commit}, containerID) => {
        return new Promise((resolve, reject) => {
            const headers = new Headers()
            const init = {
                method: 'GET',
                headers,
                mode: 'cors',
                cache: 'no-store'
            }

            let request = new Request(`${Kite}api/docker/${containerID}`, init)

            fetch(request).then(response => {
                if(response.ok) return response.json()
                else reject(response.status)
            }).then(parsedData => {
                console.log(parsedData)
                commit('appendContainer', parsedData)
                resolve()
            }).catch(error => reject(error))
        })
    }
  },
  getters: {
      currentContainer: (state) => {
        return state.containers.find(container => container.Name === state.currentContainerId)
      },
      getContainerByOwner: (state) => (owner) => {
          return state.containers.find(container => container.Name === owner)
      },
      getAllContainers: state => {
          return state.containers
      }
  }
})
