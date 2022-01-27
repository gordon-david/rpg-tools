import React from 'react';
import './App.css';
import { reducers } from './store';
import { createStore } from 'redux';
import { SWDice } from './components/SWDice';
import {DiceRoller} from './components/DiceRoller';
import { Provider } from 'react-redux';

const store = createStore(reducers)

function App() {
  return (
    <div>
      <Provider store={store}>
        <SWDice />
        <DiceRoller />
      </Provider >
    </div>
  );
}

export default App;
