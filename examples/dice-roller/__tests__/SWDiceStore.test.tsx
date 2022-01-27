import React, { Component } from 'react'
import { reducers, actionCreators } from '../store'
import { connect, Provider } from 'react-redux'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import { DiceFaces } from '../utilities/Dice'

let store: Store;
let StoreTester: any;

class _StoreTester extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

beforeEach(() => {

  store = createStore(reducers)
  StoreTester = connect(
    (state: any) => ({ rollResults: state.rollResults }),
    (dispatch: any) => ({ addRollResult: (result: string) => dispatch(actionCreators.addRollResult(result)) })
  )(_StoreTester)

}) as React.Component

test('Store is created', () => {
  expect(store).toBeTruthy()
})

test('Basic store tester component recieves state props when mounted', () => {
  const wrapper = mount(
    <Provider store={store}>
      <StoreTester />
    </Provider>
  )

  expect(wrapper.props().store.getState()).toEqual(store.getState())
})

test('addRollResults actionCreator, prepends a new result to the store', () => {
  store.dispatch(actionCreators.addRollResult('test roll result0'))
  store.dispatch(actionCreators.addRollResult('test roll result1'))

  expect(store.getState().rollResults[0].results).toBe('test roll result1')
})

test('rollResults maintain uniqueness between eachother', () => {
    const similarResults = [DiceFaces.Genesys.LIGHT]
    store.dispatch(actionCreators.addRollResult(similarResults))
    store.dispatch(actionCreators.addRollResult(similarResults))
   
    const rollResultIdSet = new Set(store.getState().rollResults.map(r => r.id))
    expect(rollResultIdSet.size).toBe(2)

})
