import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { AuthContext } from "../store/auth-context";
import { getDateMinusDays } from "../util/date";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const [recentResults, setRecentResults] = useState();
  const [asyncResults, setAsyncResults] = useState()

  const results = resultsCtx?.results;
  // console.log("rec rstults", recentResults);
  // console.log("resullllltttts", results);
  // console.log('async rec restults in recent results', asyncResults)
  

  async function recentResultsHandler() {
    setRecentResults(
      results &&
        results.filter((item) => {
          // console.log("item", item);
          // console.log("hoi");
          const today = new Date();
          const thisPeriod = getDateMinusDays(today, 30);
          if (item.date >= thisPeriod && item.date <= today) {
            return item;
          }
        })
    );
   

  }

  async function asyncHandler() {
   const  curRecentResults = JSON.parse(await AsyncStorage.getItem("recentResults"))
   setAsyncResults(curRecentResults)
  }

  useEffect(() => {
    recentResultsHandler();

  }, [results]);

  useEffect(()=> {
    asyncHandler()
  },[])


  return (
    <ResultsOutput
      results={recentResults?.length > 0 ? recentResults : asyncResults}
      resultPeriod="Deze periode"
      fallbackText="Nog geen resultaten"
    />
  );
}
