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

  function resultsHandler(results) {
    const today = new Date();
    console.log('today', today)
    const startDate = new Date(2022, 10, 25)
    // console.log('cur per', curPeriod)
    // const thisPeriod = getDateMinusDays(today, 30);
    const curRecentResults = results.filter((item) => {
      return item.date >= startDate && item.date <= today;
    });
    setRecentResults(curRecentResults);
  }
  useEffect(() => {
    resultsHandler(results);
  }, [results]);

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
