import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '@/router'
import NavDrawer from '@/components/NavDrawer.vue'

describe('NavDrawer', () => {
    let wrapper

    beforeEach(() => {
        Vue.use(router)
        Vue.use(Vuetify)

        wrapper = mount(NavDrawer, { router })
    })

    it('should render Vuetify components', () => {
        expect(wrapper.contains('aside.v-navigation-drawer')).toBe(true)
    })

    it('should render drawer items correctly', () => {
        wrapper.vm.items = [
            {
                title: 'Foo',
                icon: 'dashboard',
                route: 'foo'
            },
            {
                title: 'Bar',
                icon: 'bug_report'
            },
            {
                title: 'FooBar',
                icon: 'fooBar',
                route: 'fooBar'
            }
        ]

        expect(wrapper.element).toMatchSnapshot()
    })

    it('handleRoute pushes correct named route', () => {
        wrapper.vm.handleRoute('listContainers')
        expect(wrapper.vm.$route.path).toBe('/' || '')
    })

    it('handleRoute should do NOTHING without params', () => {
        const initialPath = wrapper.vm.$route.path

        wrapper.vm.handleRoute()
        expect(wrapper.vm.$route.path).toBe(initialPath)
    })
})