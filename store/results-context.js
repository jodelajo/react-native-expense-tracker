import {createContext, useReducer} from "react";



const DUMMY_RESULTS = [
    {
        id: 'e1',
        course: 'Wiskunde',
        major: true,
        result: 7,
        date: new Date('2022-04-01')
    },
    {
        id: 'e2',
        course: 'Nederlands',
        major: false,
        result: 5,
        date: new Date('2022-04-11')
    }, {
        id: 'e3',
        course: 'Frans',
        major: true,
        result: 6.3,
        date: new Date('2022-05-06')
    }, {
        id: 'e4',
        course: 'Biologie',
        major: false,
        result: 7.7,
        date: new Date('2022-05-21')
    }, {
        id: 'e5',
        course: 'Gym',
        major: false,
        result: 4,
        date: new Date('2022-05-29')
    }, {
        id: 'e6',
        course: 'Fries',
        major: true,
        result: 7,
        date: new Date('2022-06-03')
    }, {
        id: 'e7',
        course: 'Biologie',
        major: false,
        result: 5.4,
        date: new Date('2022-06-09')
    }, {
        id: 'e8',
        course: 'Gym',
        major: true,
        result: 7.2,
        date: new Date('2022-06-11')
    }, {
        id: 'e9',
        course: 'Fries',
        major: true,
        result: 5,
        date: new Date('2022-06-13')
    },
]

export const ResultsContext = createContext({
    results: [],
    addResult: ({course, major, result, date}) => {},
    deleteResult: (id) => {},
    updateResult: (id, {course, major, result, date}) => {},
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
        results: resultsState,
        addResult: addResult,
        deleteResult: deleteResult,
        updateResult: updateResult
    }

    return <ResultsContext.Provider value={value}>
        {children}
    </ResultsContext.Provider>
}