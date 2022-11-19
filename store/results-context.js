import React, { createContext, useReducer, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ResultsContext = createContext({
  courses: [],
  results: [],
  addResult: ({ course, confirmed, type, result, date, amount }) => {},
  setResults: (results) => {},
  deleteResult: (id) => {},
  updateResult: (id, { course, type, confirmed, result, date, amount }) => {},
});

function resultsReducer(state, action) {
  console.log('state', state)
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

  function addResult(resultData) {
    dispatch({
      type: "ADD",
      payload: resultData,
    });
  }

  async function setResults(results) {
    console.log('resulst state', resultsState)
    dispatch({ type: "SET", payload: results });
    // await AsyncStorage.setItem("results", JSON.stringify(results))
  }

  function deleteResult(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateResult(id, resultData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: resultData } });
  }


  const getResults = async () => {
    try {
      const results = JSON.parse(await AsyncStorage.getItem("results"))
      return results ? results : {}
    } catch (error) {
      console.log(error)
    }
  }

const fetchResults = async() => {
  const results = await getResults()
  console.log('results in fethc results', results)
  dispatch({type: "ADD", payload: results})
}

useEffect(() => {
  fetchResults()
},[])

  const value = {
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
