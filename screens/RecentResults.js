import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React,{ useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { getDateMinusDays } from "../util/date";
import { fetchResults } from "../http/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

export default function RecentResults() {
  const navigation = useNavigation();
  // const storage = getStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getResults() {
      setIsLoading(true);
      try {
        const results = await fetchResults(authCtx.currentUser.userId, authCtx.token);
        resultsCtx.setResults(results);
        // console.log(authCtx.token)
      } catch (error) {
        // console.log('error', error )
        setError(
          "Kan geen recente resultaten ophalen - Probeer later nog een keer!"
        );
      }
      setIsLoading(false);
    }
    if (!!authCtx.currentUser){
      getResults();
    }
    if (!authCtx.token){
      navigation.navigate("Login")
    }
  }, [authCtx.currentUser, authCtx.token]);

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
