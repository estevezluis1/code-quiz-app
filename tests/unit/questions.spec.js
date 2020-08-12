import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import QuestionItem from '@/components/QuestionItem'

describe('QuestionItem.vue', () => {
    it('renders props when passed', () => {
        const question = 'test'
        const options = ['Test1', 'Test2']
        const wrapper = shallowMount(QuestionItem, {
            propsData: { question, options }
        })

        expect(wrapper.text()).equal(options.join(''))
    })
})