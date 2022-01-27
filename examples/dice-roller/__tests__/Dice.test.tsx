import React from 'react'
import { Dice } from '../components/DiceRoller/Dice'
import { ReactWrapper, shallow } from 'enzyme'

test('renders correctly', () => {
    const wrapper = shallow(<Dice />)
    expect(wrapper).toMatchSnapshot()
})

test('clicking dice-increment button calls increment prop', () => {
    const mockFn = jest.fn()
    const wrapper: ReactWrapper = shallow(<Dice increment={mockFn}/>)
    wrapper.find('button.increment').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
})
