import TestComponent from "../components/TestComponent.vue";
import { mount } from '@vue/test-utils';

describe('TestComponent', () => {
    Test('Testing props', () => {
        const wrapper = mount(TestComponent, {
            propsData: {
                message: "Hello World"
            }
        })
        expect(wrapper.text()).toEqual('The message is: Hello World')
    })
})