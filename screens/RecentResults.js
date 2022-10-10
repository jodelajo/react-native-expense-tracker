import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React,{ useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { getDateMinusDays } from "../util/date";
import { fetchResults } from "../components/UI/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

export default function RecentResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  // console.log('refresh token in recent results', authCtx.refreshToken)

  useEffect(() => {
    async function getResults() {
      setIsLoading(true);
      try {
        const results = await fetchResults(authCtx.userId, authCtx.token);
        resultsCtx.setResults(results);
      } catch (error) {
        setError(
          "Kan geen recente resultaten ophalen - Probeer later nog een keer!"
        );
      }
      setIsLoading(false);
    }
    getResults();
  }, [authCtx.userId]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error.toString()} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  const recentResults = resultsCtx.results.filter((item) => {
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
