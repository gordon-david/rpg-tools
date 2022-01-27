import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { ForceTokens } from '../components/DiceRoller/ForceTokens'
import { shallow, mount } from 'enzyme'
import { reducers, actionCreators } from '../store'
import { DiceFaces } from '../utilities/Dice'

test('ForceTokens component renders', () => {
    const wrapper = shallow(<Provider store={createStore(reducers)}><ForceTokens /></Provider>)
    expect(wrapper).toMatchSnapshot()
})

test('Initial store state is filtered for force dice roll results', () => {
    const store = createStore(reducers)
    store.dispatch(actionCreators.addRollResult([DiceFaces.Genesys.ADVANTAGE]))
    store.dispatch(actionCreators.addRollResult([DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.LIGHT]))
    store.dispatch(actionCreators.addRollResult([DiceFaces.Genesys.LIGHT, DiceFaces.Genesys.DARK]))

    const wrapper = mount(<Provider store={store}><ForceTokens /></Provider>)
    expect(wrapper.find('#token-display').children().length).toBe(3)
})

test('as roll results are added to the store, new force die results are added', () => {
    const store = createStore(reducers)
    const wrapper = mount(<Provider store={store}><ForceTokens /></Provider>)
    expect(wrapper.find('#token-display').children().length).toBe(0)
    store.dispatch(actionCreators.addRollResult([DiceFaces.Genesys.ADVANTAGE, DiceFaces.Genesys.LIGHT]))
    wrapper.setProps({ rollResults: store.getState().rollResults })
    expect(wrapper.find('#token-display').children().length).toBe(1)
})

test('increment button adds a force token', () => {
    const wrapper = mount(<Provider store={createStore(reducers)}><ForceTokens/></Provider>)
    // assert default number of force tokens
    const startNumTokens = wrapper.find('#token-display').children().length
    // event click inrement-force-token button
    wrapper.find('#increment').simulate('click')
    // assert increase of force tokens
    expect(wrapper.find('#token-display').children().length).toBe(startNumTokens + 1)
})

test('decrement button removes a force token', () => {
    const wrapper = mount(<Provider store={createStore(reducers)}><ForceTokens/></Provider>)
    wrapper.find('#increment').simulate('click')
    const startNumTokens = wrapper.find('#token-display').children().length
    wrapper.find('#decrement').simulate('click')
    expect(wrapper.find('#token-display').children().length).toBe(startNumTokens - 1)
})

test('clicking a force token toggles light and dark', () => {
    const wrapper = mount(<Provider store={createStore(reducers)}><ForceTokens/></Provider>)
    wrapper.find('#increment').simulate('click')
    expect(wrapper.exists(`.${DiceFaces.Genesys.LIGHT}`)).toBe(true)
    expect(wrapper.exists(`.${DiceFaces.Genesys.DARK}`)).toBe(false)
    wrapper.find(`.${DiceFaces.Genesys.LIGHT}`).simulate('click')
    expect(wrapper.exists(`.${DiceFaces.Genesys.LIGHT}`)).toBe(false)
    expect(wrapper.exists(`.${DiceFaces.Genesys.DARK}`)).toBe(true)

})
