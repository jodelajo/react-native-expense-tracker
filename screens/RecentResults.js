import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext } from "react";
import { ResultsContext } from "../store/results-context";
import { AuthContext } from "../store/auth-context";
import { getDateMinusDays } from "../util/date";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  // const [currentRecentResults, setCurrentRecentResults] = useState();
  const results = resultsCtx.results;
  const authCtxResults = authCtx.currentUser.results;

  console.log("auth results", authCtxResults);
  console.log("results", results);

  const recentResults =
    results &&
    results.filter((item) => {
      console.log(item);
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
