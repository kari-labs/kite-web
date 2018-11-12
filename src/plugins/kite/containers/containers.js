export default class Containers {
    constructor() { }

    configure(config) {
        this.api_url = config.api_url || '';
    }

    async createContainer(studentID) {
        return await fetch(`${this.api_url}api/docker/${studentID}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store'
        });
    }

    async getContainers() {
        return await fetch(`${this.api_url}api/docker`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store'
        });
    }
}

Containers.install = function(Vue, options) {
    Object.defineProperty(Vue.prototype, '$containers', {
        get() {return this.$root._containers}
    })

    Vue.mixin({
        beforeCreate() {
            if(this.$options.containers) {
                this._containers = this.$options.containers
                this._containers.configure(options)
            }
        }
    })
}