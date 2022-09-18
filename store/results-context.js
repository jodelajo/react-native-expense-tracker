import {createContext, useReducer, useState} from "react";



const DUMMY_RESULTS = []

export const ResultsContext = createContext({
    results: [],
    addResult: ({course, major, result, date, amount}) => {},
    deleteResult: (id) => {},
    updateResult: (id, {course, major, result, date, amount}) => {},
})

function resultsReducer(state, action) {

    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableResultIndex = state.findIndex(
                (result) => result.id === action.payload.id
            )
            const updatableResult = state[updatableResultIndex]
            const updatedItem = {...updatableResult, ...action.payload.data}
            const updatedResults = [...state]
            updatedResults[updatableResultIndex] = updatedItem
            return updatedResults
        case 'DELETE':
            return state.filter((result) => result.id !== action.payload)
        default:
            return state
    }
}

export default function ResultsContextProvider({children}) {
    const [resultsState, dispatch] = useReducer(resultsReducer, DUMMY_RESULTS)
    const [saldo, setSaldo ] = useState()
    console.log('saldo in context', saldo)

    function addResult(resultData) {
        dispatch({type: 'ADD', payload: resultData})
    }

    function deleteResult(id) {
        dispatch({type: 'DELETE', payload: id})
    }

    function updateResult(id, resultData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: resultData}})
    }

    const value = {
        saldo: saldo,
        setSaldo,setSaldo,
        results: resultsState,
        addResult: addResult,
        deleteResult: deleteResult,
        updateResult: updateResult,

    }

    return <ResultsContext.Provider value={value}>
        {children}
    </ResultsContext.Provider>
}