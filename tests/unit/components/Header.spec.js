import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '@/router'
import Header from '@/components/Header.vue'

describe('Header', () => {
    let wrapper

    beforeEach(() => {
        Vue.use(router)
        Vue.use(Vuetify)

        wrapper = mount(Header, { router })
    })

    it('should render Vuetify components', () => {
        expect(wrapper.contains('nav.v-toolbar')).toBe(true)
    })

    it('should render NavDrawer', () => {
        expect(wrapper.contains('aside.v-navigation-drawer')).toBe(true)
    })

    it('should open a closed NavDrawer on click', () => {
        wrapper.find('button.v-toolbar__side-icon').trigger('click')
        expect(wrapper.vm.$refs.navDrawer.drawer).toBe(true)
    })

    it('should NOT open a NavDrawer while loading', () => {
        wrapper.vm.$refs.navDrawer.drawer = undefined

        wrapper.vm.toggleDrawer()
        expect(wrapper.vm.$refs.navDrawer.drawer).toBe(false)
    })

    it('should change route on toolbar title click', () => {
        wrapper.find('div.v-toolbar__title').trigger('click')
        expect(wrapper.vm.$route.path).toBe('/' || '')
    })

    it('calling toggleDrawer will change value of navDrawer.drawer', () => {
        const initialValue = wrapper.vm.$refs.navDrawer.drawer

        wrapper.vm.toggleDrawer()
        expect(wrapper.vm.$refs.navDrawer.drawer).toBe(!initialValue)
    })

    it('renders all elements correctly', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})