import React, { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { LoginUser } from "../components/auth/CreateUser";
import { AuthContext } from "../store/auth-context";
import { fetchResults, getUser, fetchUser } from "../components/UI/http";
import { ResultsContext } from "../store/results-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [timer, setTimer] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const response = await LoginUser(email, password);
      // console.log('response', response.idToken)
      authCtx.authenticate(response.idToken);
      const userProfile = await getUser(response.idToken);
      const user = await fetchUser(response.localId, response.idToken);
      
      // console.log('user profile', userProfile)
      // console.log('user', user)
      AsyncStorage.setItem("refreshToken", response.refreshToken);
      // const userId = user[0];
      authCtx.userHandler({
        userId: userProfile[0].localId,
        displayName: userProfile[0].displayName,
        photoUrl: userProfile[0].photoUrl,
        refreshToken: userProfile[0].refreshToken,
        email: userProfile[0].email,
      });
      const results = await fetchResults(response.localId, response.idToken);
      resultsCtx.setResults(results);
      // console.log("results in login", results);
    } catch (error) {
      setIsLoading(false);
      setError(error.toString())
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
