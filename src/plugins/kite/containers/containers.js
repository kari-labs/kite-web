export default class Containers {
    constructor() { }

    configure(config) {
        this.api_url = config.api_url || '';
    }


    /* mutation{
  createContainer(userid: "chicken")
} */

    gql(args, ...values){
        let query = "";
        args.forEach( (string, i) => {
            query += string + (values[i] || '');
        });
        return query.replace(/([\\][n])?([\s])+/g, " ");
        //return JSON.stringify({query: query.replace(/([\\][n])?([\s])+/g, " ")})
    }

    async createContainer(studentID) {
        /* return await fetch(`${this.api_url}api/docker/${studentID}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store'
        }); */
        return fetch(`${this.api_url}api/graphql`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                mutation{
                    createContainer(userid: "${studentID}")
                }
                `
            })
        })
    }

    async getContainers() {
        /* return await fetch(`${this.api_url}api/docker`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store'
        }); */
        return fetch(`${this.api_url}api/graphql`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                query{
                  containers: getAllContainers{
                    Name
                    State{ Status }
                    Created
                  }
                }
              `
            })
        }).then(res=>res.json())
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