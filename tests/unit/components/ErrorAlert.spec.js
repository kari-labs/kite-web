import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import ErrorAlert from '@/components/ErrorAlert.vue'

describe('ErrorAlert', () => {
    let wrapper

    beforeEach(() => {
        Vue.use(Vuetify)

        // Fixes Vuetify nag
        document.body.setAttribute('data-app', true)
        wrapper = mount(ErrorAlert, {
            propsData: {
                alert: true,
                text: 'foobar'
            }
        })
    })

    it('should render Vuetify components', () => {
        expect(wrapper.contains('div.v-alert')).toBe(true)
    })

    it('should render alert correctly', () => {
        wrapper.props.text = 'foo bar foobar BarFoo'
        expect(wrapper.element).toMatchSnapshot()
    })

    it('should render correctly when hidden', () => {
        wrapper = mount(ErrorAlert, {
            propsData: {
                alert: false,
                text: 'foo and also bar'
            }
        })

        Vue.nextTick(() => {
            expect(wrapper.element).toMatchSnapshot()
        })
    })
})