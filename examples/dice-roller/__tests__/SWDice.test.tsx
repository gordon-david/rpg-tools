import React from 'react'
import { SWDice } from '../components/SWDice'
import { shallow, mount, ReactWrapper } from 'enzyme'
import { DiceFaces, DiceTypes } from "../utilities/Dice"
import { Provider } from 'react-redux'
import { createStore, Reducer } from 'redux'
import { reducers } from '../store'

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(
    <Provider store={createStore(reducers as Reducer)}>
      <SWDice />
    </Provider>
  )
})

test("clicking a dice button increases the dice counter", () => {
  const dice = wrapper.find(`div.dice#${DiceTypes.Genesys.ABILITY}`)
  const startingCount = Number.parseInt(dice.find('.dice-counter').text())

  dice.find('button').simulate('click')
  expect(Number.parseInt(dice.find('.dice-counter').text())).toBeGreaterThan(startingCount)
})

test("component renders without error", () => {
  expect(wrapper).toBeTruthy()
})

test("force dice roll results add to force tokens display", () => {
  const rollButton = wrapper.find('button#roll')
  const forceDiceButton = wrapper.find(`button#${DiceTypes.Genesys.FORCE}`)
  const startingTokens = wrapper.find('#force-tokens-display').children().length

  forceDiceButton.simulate('click')
  rollButton.simulate('click')

  expect(wrapper.find('#force-tokens-display').children().length).toBeGreaterThan(startingTokens)
})

test("is populated by dice rolls", () => {
  wrapper.find(`button.increase-dice-count#${DiceTypes.Genesys.ABILITY}`).simulate('click')
  wrapper.find('button#roll').simulate('click')
  expect(wrapper.find('.results-list').children()).toHaveLength(1)
})
