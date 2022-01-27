import { Reducer } from 'redux'
import { v4 as uuidv4 } from 'uuid'

export interface RollResult {
    id: string,
    timestamp: number,
    results: Array<string>
}

export interface StoreState{
    rollResults: Array<RollResult>
}

const types = {
    ADD_ROLL_RESULT: 'ADD_ROLL_RESULT'
}

export const actionCreators = {
    addRollResult(results: Array<string>) {
        const newResult: RollResult = {
            results,
            id: uuidv4(),
            timestamp: Date.now()
        }
        return { type: types.ADD_ROLL_RESULT, newResult}
    }
}

const initialState: StoreState = {
    rollResults:  []
}

export const reducers: Reducer = (state: StoreState = initialState, action) => {
    switch (action.type) {
        case types.ADD_ROLL_RESULT:
            return {
                ...state,
                rollResults:
                    [
                        action.newResult,
                        ...state.rollResults
                    ]
            }
        default:
            return state;
    }
}
