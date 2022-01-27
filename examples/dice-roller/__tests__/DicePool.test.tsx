import React from 'react'
import { shallow, mount } from 'enzyme'
import { DicePool, IDicePoolProps } from '../components/DiceRoller/DicePool'

function makeTestProps(){
    return {
        roll: function(){},
        dice: [{diceType: 'test-dice', displayName:'test-displayname', amount:0}]
    }
}

test('renders correctly', () => {
    const props: IDicePoolProps = makeTestProps()
    const wrapper = shallow(<DicePool roll={props.roll} dice={props.dice} />)
    expect(wrapper).toMatchSnapshot()
})

test('renders with default props', () => {
    const wrapper = shallow(<DicePool />)
    expect(wrapper).toMatchSnapshot()
})

test('constructs dice pool of Dice components from diceTypes props', () => {
    const props = makeTestProps()
    const wrapper = shallow(<DicePool dice={props.dice} roll={props.roll} />)
    expect(wrapper.find(`.dice#${props.dice[0].diceType}`))
})

test('clear button resets dice pool counts to 0', () => {
    const props = makeTestProps()
    const wrapper = mount(<DicePool dice={props.dice} roll={props.roll} />)
    const diceChild = wrapper.find(`.dice#${props.dice[0].diceType}`)

    diceChild.find('button.increment').simulate('click')
    expect(diceChild.find('.amount').text()).toBe('1')
    wrapper.find('button#clear').simulate('click')
    expect(diceChild.find('.amount').text()).toBe('0')
})

test('increments dice pool when child dice increment prop is called', () => {
    const props = makeTestProps()
    const wrapper = mount(<DicePool dice={props.dice} roll={props.roll} />)
    const diceChild = wrapper.find(`.dice#${props.dice[0].diceType}`)

    diceChild.find('button.increment').simulate('click')
    expect(diceChild.find('.amount').text()).toBe('1')
})

// test('roll prop is called when roll button is clicked', () => {
//     const mockFn = jest.fn()
//     const wrapper = shallow(<DicePool roll={mockFn} />)
//     wrapper.find('button#roll').simulate('click')
//     expect(mockFn).toHaveBeenCalledTimes(1)
// })

// test('roll button clears current dice pool')
