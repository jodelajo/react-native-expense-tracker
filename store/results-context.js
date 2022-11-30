import React, { createContext, useReducer, useState } from "react";

export const ResultsContext = createContext({
  courses: [],
  results: [],
  addResult: ({ course, confirmed, type, result, date, amount }) => {},
  setResults: (results) => {},
  deleteResult: (id) => {},
  updateResult: (id, { course, type, confirmed, result, date, amount }) => {},
});

function resultsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableResultIndex = state.findIndex(
        (result) => result.id === action.payload.id
      );
      const updatableResult = state[updatableResultIndex];
      const updatedItem = { ...updatableResult, ...action.payload.data };
      const updatedResults = [...state];
      updatedResults[updatableResultIndex] = updatedItem;
      return updatedResults;
    case "DELETE":
      return state.filter((result) => result.id !== action.payload);
    default:
      return state;
  }
}

export default function ResultsContextProvider({ children }) {
  const [resultsState, dispatch] = useReducer(resultsReducer, []);
  const [saldo, setSaldo] = useState();
  const [currentCourses, setCurrentCourses] = useState();
  const [startDate, setStartDate] = useState()

  function addResult(resultData) {
    dispatch({
      type: "ADD",
      payload: resultData,
    });
  }

  function setResults(results) {
    console.log('results in context', results)
    dispatch({ type: "SET", payload: results });
  }

  function deleteResult(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateResult(id, resultData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: resultData } });
  }

  const value = {
    startDate,
    setStartDate,
    courses: currentCourses,
    setCurrentCourses: setCurrentCourses,
    saldo: saldo,
    setSaldo: setSaldo,
    results: resultsState,
    setResults: setResults,
    addResult: addResult,
    deleteResult: deleteResult,
    updateResult: updateResult,
  };

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
}
