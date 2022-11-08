import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { getDateMinusDays } from "../util/date";
import { fetchResults, getUser } from "../http/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  // const storage = getStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  // const [userId, setUserId] =useState()

  useEffect(() => {
    async function getResults() {
      console.log("recent results", authCtx.currentUser);
      console.log("asyncstorage", await AsyncStorage.getItem("userId"));
      const userId = await AsyncStorage.getItem("userId")
      const token = await AsyncStorage.getItem("token")
      setIsLoading(true);

      try {
        const userProfile = await getUser(token);
    console.log('userprofile in authhandler', userProfile )
    authCtx.userHandler({
      userId: userProfile[0].localId,
      displayName: userProfile[0].displayName,
      photoUrl: userProfile[0].photoUrl,
      refreshToken: userProfile[0].refreshToken,
      email: userProfile[0].email,
    });
        const results = await fetchResults(
          authCtx.currentUser.userId
            ? authCtx.currentUser.userId
            : userId,
          authCtx.token ? authCtx.token : AsyncStorage.getItem("token")
        );
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
    if (!!authCtx.currentUser) {
      getResults();
    }
    if (!authCtx.token) {
      navigation.navigate("Login");
    }
  }, []);

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
