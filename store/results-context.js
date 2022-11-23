import React, { createContext, useReducer, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDateMinusDays } from "../util/date";

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

  function addResult(resultData) {
    dispatch({
      type: "ADD",
      payload: resultData,
    });
  }

  async function setResults(results) {
    dispatch({ type: "SET", payload: results });
    addRecentResults(results);
  }

  function deleteResult(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateResult(id, resultData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: resultData } });
  }

  const getResults = async () => {
    try {
      const results = JSON.parse(await AsyncStorage.getItem("results"));
      dispatch({ type: "SET", payload: results });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const addRecentResults = async (results) => {
    const recentResults = results?.filter((item) => {
      const today = new Date();
      const thisPeriod = getDateMinusDays(today, 30);
      if (item.date >= thisPeriod && item.date <= today) {
        return item;
      }
    });
    try {
      await AsyncStorage.setItem(
        "recentResults",
        JSON.stringify(recentResults)
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("resulst state", resultsState);

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
