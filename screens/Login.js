import React, { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { LoginUser } from "../components/auth/CreateUser";
import { AuthContext } from "../store/auth-context";
import { fetchResults, getUser } from "../components/UI/http";
import { ResultsContext } from "../store/results-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const response = await LoginUser(email, password);
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
    } catch (error) {
      setError(error.toString());
      setIsLoading(false);
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
