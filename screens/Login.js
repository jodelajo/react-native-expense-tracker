import React, { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { ResultsContext } from "../store/results-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthHandler from "../components/auth/AuthHandler";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true)
    try {
      
      await AuthHandler(
        setIsLoading,
        email,
        password,
        authCtx,
        resultsCtx,
        AsyncStorage
      );
      
    } catch (error) {
      setError(error.toString());
      setIsLoading(false)
    }
    setIsLoading(false)
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
