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

  async function getStoredUser() {
    // const userId = await AsyncStorage.getItem("userId")
      const token = await AsyncStorage.getItem("token")
    const userProfile = await getUser(token);
    console.log('userprofile in authhandler', userProfile )
    authCtx.userHandler({
      userId: userProfile[0].localId,
      displayName: userProfile[0].displayName,
      photoUrl: userProfile[0].photoUrl,
      refreshToken: userProfile[0].refreshToken,
      email: userProfile[0].email,
    });
  }

useEffect(() => {

  async function getResults() {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem("userId")
    //       const token = await AsyncStorage.getItem("token")
    try {
      const results = await fetchResults(userId, authCtx.token);
      resultsCtx.setResults(results);
      console.log(authCtx.token)
      console.log('useriD in recentresults', userId)
    } catch (error) {
      // console.log('error', error )
      setError(
        "Kan geen recente resultaten ophalen - Probeer later nog een keer!"
      );
    }
    setIsLoading(false);
  }
  if (!!authCtx.currentUser){
   console.log('authctx currentuser', authCtx.currentUser)
    getStoredUser()
  }
  if (!authCtx.token){
    navigation.navigate("Login")
  }
  getResults();
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
