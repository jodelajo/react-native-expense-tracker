import { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { LoginUser } from "../components/auth/CreateUser";
import { AuthContext } from "../store/auth-context";
import FetchUser from "../components/auth/FetchUser";
import { fetchResults } from "../components/UI/http";
import { ResultsContext } from "../store/results-context";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const resultsCtx = useContext(ResultsContext)
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    console.log(email, password);
    setIsLoading(true);
    try {
      const token = await LoginUser(email, password);
      authCtx.authenticate(token);
      const user = await FetchUser(email);
      const userId = user[0]
      authCtx.userHandler(userId[0]);
      const results = await fetchResults(userId[0])
      resultsCtx.setResults(results)
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
