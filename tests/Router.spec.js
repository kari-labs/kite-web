import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Router from '../src/js/views/Router.vue'
import Header from '../src/js/components/Header.vue'
import Footer from '../src/js/components/Footer.vue'
import NavDrawer from '../src/js/components/NavDrawer.vue'

describe('Router', () => {
    let testBed;

    const routes = [
        {
            path: '/',
            name: 'listContainers'
        }
    ]

    const router = new VueRouter({ routes })

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.config.productionTip = false
        localVue.use(VueRouter)
        localVue.use(Vuetify)

        testBed = shallowMount(Router, {
            stubs: {
                'neit-header': Header,
                'neit-footer': Footer,
                'nav-drawer': NavDrawer
            },
            localVue,
            router
        })
    })

    it('should render site header', () => {
        expect(testBed.contains('nav.v-toolbar')).toBe(true)

        //Visual Inspection
        console.log(testBed.find('nav.v-toolbar').html())
    })

    it('should render site footer', () => {
        expect(testBed.contains('footer.v-footer')).toBe(true)

        //Visual Inspection
        console.log(testBed.find('footer.v-footer').html())
    })
})