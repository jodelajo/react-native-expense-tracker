import ResultsOutput from "../components/ResultsOutput/ResultsOutput";
import React, { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../store/results-context";
import { getDateMinusDays } from "../util/date";
import { fetchResults, getUser, fetchCourses } from "../http/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentResults() {
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  // const [user, setUser] = useState()
  const [error, setError] = useState();

  const token = authCtx.token.accessToken
  const userId = authCtx?.currentUser
  const results = resultsCtx.results

  // async function getResults(user) {
  //   setIsLoading(true);
  //   // const userId = await AsyncStorage.getItem("userId");
  //   // const token = await AsyncStorage.getItem("token");
  //  console.log('user?', user)
  //   console.log('userid', userId)
  //   if (user) {
  //     try {
  //       const results = await fetchResults(user.localId, token);
  //       resultsCtx.setResults(results);
  //     } catch (error) {
  //       setError(
  //         "Kan geen recente resultaten ophalen - Probeer later nog een keer!"
  //       );
  //     }
  //     setIsLoading(false);
  //   }
  //   // if (!!authCtx.currentUser) {
  //   //   console.log("authctx currentuser", authCtx.currentUser);
  //   //   getStoredUser();
  //   // }
  //   if (!authCtx.token) {
  //     navigation.navigate("Login");
  //   }
  //   // getResults();
  //   }

  // useEffect(()=> {
  //   setIsLoading(true)
  //   async function getStoredUser() {
  //     const token = authCtx.token.accessToken
  //     console.log('token', token)
  //     try {
  //       const userProfile = await getUser(token);
  //     console.log("userprofile in authhandler", userProfile);
  //     // setUser(userProfile)
  //     authCtx.userHandler({
  //       userId: userProfile[0].localId,
  //       displayName: userProfile[0].displayName,
  //       photoUrl: userProfile[0].photoUrl,
  //       // refreshToken: refreshToken,
  //       email: userProfile[0].email,
  //     });
  //     const courses = await fetchCourses(userProfile[0].localId, token);
  //     console.log('courses', courses)
  //     resultsCtx.setCurrentCourses(courses);
  //     getResults(userProfile[0])
  //     } catch (error) {
        
  //     }
  //   }
  //   setIsLoading(false)
  //   getStoredUser()
    
  // },[])
 

  // useEffect(() => {
  //   async function getResults() {
  //     setIsLoading(true);
  //     // const userId = await AsyncStorage.getItem("userId");
  //     // const token = await AsyncStorage.getItem("token");
  //     const token = authCtx.token
  //     const userId = authCtx?.currentUser
  //     console.log('userid', userId)
  //     if (userId) {
  //       try {
  //         const results = await fetchResults(userId, token);
  //         resultsCtx.setResults(results);
  //       } catch (error) {
  //         setError(
  //           "Kan geen recente resultaten ophalen - Probeer later nog een keer!"
  //         );
  //       }
  //       setIsLoading(false);
  //     }
  //     // if (!!authCtx.currentUser) {
  //     //   console.log("authctx currentuser", authCtx.currentUser);
  //     //   getStoredUser();
  //     // }
  //     if (!authCtx.token) {
  //       navigation.navigate("Login");
  //     }
  //     // getResults();
  //     }
     
  // }, []);

  // {results && results.filter((item) => {
  //   const today = new Date();
  //   const thisPeriod = getDateMinusDays(today, 30);
  //   console.log('results', item.date)
  //   return item.date >= thisPeriod && item.date <= today;
  // });}

  console.log('results', results)

    const recentResults = resultsCtx.results.filter((item) => {
    const today = new Date();
    const thisPeriod = getDateMinusDays(today, 30);
    return item.date >= thisPeriod && item.date <= today;
  });

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
