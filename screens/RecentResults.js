import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { getDateMinusDays } from "../util/date";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [recentResults, setRecentResults] = useState();
  const [error, setError] = useState();

  const results = resultsCtx.results;
  const startDate = resultsCtx?.startDate

  // console.log('start', startDate)

  function resultsHandler(results, curDate) {
    const today = new Date();
    const curStartDdate = new Date(curDate)
    // console.log('date', date)
  
    const curRecentResults = results.filter((item) => {
      return item.date >= curStartDdate && item.date <= today;
    });
    setRecentResults(curRecentResults);
  }
  useEffect(() => {
    // console.log('!!', startDate)
    if (startDate !== undefined) {
      resultsHandler(results, startDate);
    }
   
  }, [results, startDate]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error.toString()} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ResultsOutput
      results={recentResults}
      resultPeriod="Deze periode"
      fallbackText="Nog geen resultaten"
    />
  );
}
