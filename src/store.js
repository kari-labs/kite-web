import Vue from 'vue'
import Vuex from 'vuex'
import Kite from '@/mixins/api'

Vue.use(Vuex)

/**
 * @author Joseph Zurowski
 * @description Filters the data returned by the Docker API
 * @public
 * @param {DockerContainer} data
 * @returns {FilteredDockerContainer}
 */
function filterContainer(data) {
    let containerName = data.Name
    let containerStartTime = data.State.StartedAt

    // Filter out the junk Docker puts with the container name
    // We are filtering out the prefixed '/' and the postfixed 'php'
    // Use the first Regex result as we are evaluating each element separately
    containerName = containerName.match(/\b\d+/)[0]
    
    // Convert the Container Start Time from a UTC date string to a
    // Localized JavaScript Date object string
    containerStartTime = new Date(containerStartTime).toLocaleString()

    // Overwrite the parsedData with out new filtered data then repeat
    data.Name = containerName
    data.State.StartedAt = containerStartTime

    return data
}

export default new Vuex.Store({
  state: {
    containers: [],
    currentContainer: null,
    // dialogTypes is read-only
    dialogTypes: {
        'error': {
            color: 'red',
            defaultTitle: 'Error',
            defaultText: 'Some sort of error occurred. If you are a developer, submit an issue to our GitHub repository.'
        },
        'success': {
            color: 'green darken-3',
            defaultTitle: 'Success',
            defaultText: 'The operation completed successfully.'
        },
        'uninitialized': {
            color: 'gray darken-2',
            defaultTitle: 'Placeholder',
            defaultText: 'This dialog was shown without any data. If you are a developer, submit an issue to our GitHub repository.'
        }
    },
    // dialog is read/write and is used to look up
    // the default values of its respective dialogType
    dialog: {
        type: 'uninitialized',
        visible: false,
        color: null,
        title: null,
        text: null
    },
    progressDialogVisible: false
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
      },
      setDialogType(state, value) {
        state.dialog.type = value
      },
      setDialogVisibility(state, value) {
        state.dialog.visible = value
      },
      setDialogColor(state, value) {
        state.dialog.color = value
      },
      setDialogTitle(state, value) {
        state.dialog.title = value
      },
      setDialogText(state, message) {
        state.dialog.text = message
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
                // Pass each object element to our filtering function
                parsedData.forEach((element, elementIndex) => parsedData[elementIndex] = filterContainer(element))

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
                else throw new Error(response.status)
            }).then(parsedData => {
                // Filter the container object
                return filterContainer(parsedData)
            }).then(filteredData => {
                commit('appendContainer', filteredData)
                resolve()
            }).catch(error => reject(error))
        })
    },
    // Add a new container to the API, then call
    // getSingleContainerAsync to add the new container
    // object to the VueX store
    addNewContainerAsync: ({dispatch}, containerID) => {
        return new Promise((resolve, reject) => {
            // We start by writing our POST request to the API
            const headers = new Headers()
            const init = {
                method: 'POST',
                headers,
                mode: 'cors',
                cache: 'no-store'
            }

            let request = new Request(`${Kite}api/docker/${containerID}`, init)

            // Perform HTTP Request
            fetch(request).then(response => {
                if(response.ok) return
                // Do not continue if the API reports an error
                else throw new Error(response.status)
            }).then(() => {
                // Get the docker API data for the newly created container
                // and add it to the current container list
                return dispatch('getSingleContainerAsync', containerID)
            }).then(() => {
                // Once dispatch completes, resolve the Promise
                resolve()
            }).catch(error => reject(error))
        })
    },
    showPersistentDialog: ({commit}, {dialogType, color, title, message}) => {
        commit('setDialogType', dialogType)
        commit('setDialogColor', color)
        commit('setDialogTitle', title)
        commit('setDialogText', message)
        commit('setDialogVisibility', true)
    }
  },
  getters: {
    currentContainer: state => {
    return state.containers.find(container => container.Name === state.currentContainer)
    },
    getContainerByOwner: state => owner => {
        return state.containers.find(container => container.Name === owner)
    },
    getAllContainers: state => { return state.containers },
    getDialogDefaults: state => { return state.dialogTypes[state.dialog.type] },
    getDialogVisibility: state => {
        return state.dialog.visible
    },
    getDialogColor: state => {
        return state.dialog.color || state.dialogTypes[state.dialog.type].color
    },
    getDialogTitle: state => {
        return state.dialog.title || state.dialogTypes[state.dialog.type].defaultTitle
    },
    getDialogText: state => {
        return state.dialog.text || state.dialogTypes[state.dialog.type].defaultText
    }
  }
})
