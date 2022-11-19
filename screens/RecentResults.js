import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { AuthContext } from "../store/auth-context";
import { getDateMinusDays } from "../util/date";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  const [currentRecentResults, setCurrentRecentResults] = useState();
  const results = resultsCtx.results;
  const authCtxResults = authCtx.currentUser.results;

  console.log("auth results", authCtxResults);
  console.log("results", results);
  // console.log("cur rec", currentRecentResults);

 
  // const resultsHandler = async () => {
  //   console.log("blee res", results);
  //   let recentResults = [];
  //   if (results?.length > 0) {
  //     recentResults =
  //       results &&
  //       results.filter((item) => {
  //         const today = new Date();
  //         const thisPeriod = getDateMinusDays(today, 30);
  //         return item.date >= thisPeriod && item.date <= today;
  //       });
  //     setCurrentRecentResults(recentResults);
  //     await AsyncStorage.setItem(
  //       "recentResults",
  //       JSON.stringify(recentResults)
  //     );
  //   } if (results?.length == 0) {
  //     recentResults = JSON.parse(
  //       await AsyncStorage.getItem("recentResults")
  //     );
  //     setCurrentRecentResults(recentResults);
  // };

  // async function asyncResults() {
  //   if (results.length == 0) {
  //     const recentResults = JSON.parse(
  //       await AsyncStorage.getItem("recentResults")
  //     );
  //     setCurrentRecentResults(recentResults);
  //   }
  // }
// }

  useEffect(() => {
    // resultsHandler();
  }, [results]);

  const recentResults = results && results.filter((item) => {
    console.log(item)
    const today = new Date();
    const thisPeriod = getDateMinusDays(today, 30);
    return item.date >= thisPeriod && item.date <= today;
  });
  
  return (
    <ResultsOutput
      results={recentResults}
      resultPeriod="Deze periode"
      fallbackText="Nog geen resultaten"
    />
  );
}
