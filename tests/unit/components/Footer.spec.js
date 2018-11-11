import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '@/router'
import Footer from '@/components/Footer.vue'

describe('Footer', () => {
    let wrapper

    beforeEach(() => {
        Vue.use(router)
        Vue.use(Vuetify)

        wrapper = mount(Footer, { router })
    })

    it('should render Vuetify components', () => {
        expect(wrapper.contains('footer.v-footer')).toBe(true)
    })

    it('should render social media links correctly', () => {
        wrapper.vm.icons = [
            'fab fa-twitch',
            'fab fa-google-plus',
            'fab fa-steam'
        ]

        expect(wrapper.element).toMatchSnapshot()
    })
})