import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { View } from "react-native";
import { CreateUser } from "../components/auth/CreateUser";
import React, { useState, useContext } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { ResultsContext } from "../store/results-context";
import { errorMessages } from "../constants/errorMessages";
import { LoginUser } from "../components/auth/CreateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, fetchResults,fetchCourses } from "../http/http";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const resultsCtx = useContext(ResultsContext);

  async function signupHandler({ email, password }) {
    try {
      setIsLoading(true);
      const token = await CreateUser(email, password, setIsLoading);
      authCtx.authenticate(token);
      console.log('token in signup', token)
      if(token){
        // authCtx.logout(resultsCtx.setResults);
        // if(Platform.OS === 'web') {
        //   alert("Joepie, je account is aangemaakt, log nu in met je emailadres en wachtwoord.")
        // } else {
        //   Alert.alert("Joepie, je account is aangemaakt, log nu in met je emailadres en wachtwoord.")
        // }
      
        setIsLoading(true);
        try {
          const response = await LoginUser(email, password, setIsLoading);
          authCtx.authenticate(response.idToken);
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("refreshToken", response.refreshToken);
          const userProfile = await getUser(response.idToken);
    
          authCtx.userHandler({
            userId: userProfile[0].localId,
            displayName: userProfile[0].displayName,
            photoUrl: userProfile[0].photoUrl,
            refreshToken: userProfile[0].refreshToken,
            email: userProfile[0].email,
          });
    
          const results = await fetchResults(response.localId, response.idToken);
          resultsCtx.setResults(results);
          const courses = await fetchCourses(response.localId, response.idToken)
          resultsCtx.setCurrentCourses(courses)
          console.log('courses in login')
        } catch (error) {
          // setError(error.toString());
          setIsLoading(false);
        }
        setIsLoading(false);
     }
     
    } catch (error) {
      // Alert.alert('jajaja', 'sdiof soidfjoi sdfoijoi')
      console.log(error)
      setError(error.toString());
    
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (error && !isLoading) {
    console.log(error);
    return <ErrorOverlay message={error} />;
  }


  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
