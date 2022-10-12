import React, { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { LoginUser } from "../components/auth/CreateUser";
import { AuthContext } from "../store/auth-context";
import FetchUser from "../components/auth/FetchUser";
import { fetchResults, getUser } from "../components/UI/http";
import { ResultsContext } from "../store/results-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [timer, setTimer] = useState()
  const resultsCtx = useContext(ResultsContext)
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    // console.log(email, password);
    setIsLoading(true);
    try {
      const token = await LoginUser(email, password);
      authCtx.authenticate(token);
      const user = await FetchUser(email, token);
      const userProfile = await getUser(token)
      console.log('userprofile', userProfile[0].displayName)
      authCtx.setName(userProfile[0].displayName)
      authCtx.setPhotoUrl(userProfile[0].photoUrl)
      // console.log('user in Login', user[0][1])
      // setTimer( user[0][1].expiresIn)
      authCtx.setRToken(user[0][1].refreshToken)
      AsyncStorage.setItem("refreshToken", user[0][1].refreshToken);
      const userId = user[0]
      authCtx.userHandler(userId[0]);
      const results = await fetchResults(userId[0], token)
      resultsCtx.setResults(results)
      // console.log('results in login', results)
    } catch (error) {
      // setError(error.toString())
      // setIsLoading(false)
      Alert.alert("blabla", "sdoij soidfjsod isdoi sdofij");
    }
    setIsLoading(false);
  }
 

  if (isLoading) {
    return <LoadingOverlay />;
  }
  // if (error && !isLoading) {
  //     console.log(error)
  //     return <ErrorOverlay message={error} />
  // }
  return (
    <View style={styles.container}>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
