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

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const resultsCtx = useContext(ResultsContext);

  async function signupHandler({ email, password }) {
    try {
      setIsLoading(true);
      const token = await CreateUser(email, password);
      authCtx.authenticate(token);
      console.log('token in signup', token)
      if(token){
        authCtx.logout(resultsCtx.setResults);
        if(Platform.OS === 'web') {
          alert("Joepie, je account is aangemaakt, log nu in met je emailadres en wachtwoord.")
        } else {
          Alert.alert("Joepie, je account is aangemaakt, log nu in met je emailadres en wachtwoord.")
        }
      
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
