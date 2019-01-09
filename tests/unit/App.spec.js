import { createLocalVue, shallowMount } from '@vue/test-utils'
//import VueKonami from 'vue-konami'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from '@/App.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

describe('App', () => {
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
        //localVue.use(VueKonami)
        localVue.use(VueRouter)
        localVue.use(Vuetify)

        testBed = shallowMount(App, {
            stubs: {
                'neit-header': Header,
                'neit-footer': Footer
            },
            localVue,
            router
        })
    })

    it('should render site header', () => {
        expect(testBed.contains('nav.v-toolbar')).toBe(true)
    })

    it('should render site footer', () => {
        expect(testBed.contains('footer.v-footer')).toBe(true)
    })

    it('should render correctly', () => {
        expect(testBed.element).toMatchSnapshot()
    })
})