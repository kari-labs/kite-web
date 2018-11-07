import(/* wepbackChunkName: "vuetify" */ '../css/main.styl')
import(/* webpackChunkName: "fontAwesome" */ '@fortawesome/fontawesome-free/css/all.css')

import * as Sentry from '@sentry/browser'

async function renderPage() {
    return import(/* webpackChunkName: "vue", webpackPreload: true */ 'vue').then(async({default: Vue}) => {
        return import(/* webpackChunkName: "vueRouter", webpackPreload: true */ 'vue-router').then(async({default: VueRouter}) => {
            return import(/* webpackChunkName: "vuetify", webpackPreload: true */ 'vuetify/lib').then(async({default: Vuetify}) => {
                Vue.config.productionTip = false

                Vue.use(Vuetify, {
                    iconfont: 'fa',
                    theme: {
                        primary: '#182D72',
                        secondary: '#FCB741',
                        accent: '#f8f8FF'
                    }
                })
                Vue.use(VueRouter)

                const routes = [
                    {
                        path: '/',
                        name: 'listContainers',
                        component: () => import(/* webpackChunkName: "containerDashboard" */ './views/ContainerDashboard.vue')
                    }
                ]

                const router = new VueRouter({
                    mode: 'history',
                    base: __dirname,
                    routes
                })

                new Vue({
                    router,
                    components: {
                        'router-app': () => import(/* webpackChunkName: "initialLoad", webpackPreload: true */ './views/Router.vue')
                    }
                }).$mount('#neit-app')

                Sentry.init({
                    dsn: 'https://ce48afe38fc14804846ebd78297611c3@sentry.io/1307382',
                    integrations: [new Sentry.Integrations.Vue({ Vue })],
                    release: 'neit-kite@0.1.5'
                })
            }) 
        })
    }).catch(err => 'An error occurred while loading the website')
}

renderPage()