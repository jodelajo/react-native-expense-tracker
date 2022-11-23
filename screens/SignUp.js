import AuthContent from "../components/auth/AuthContent";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { storeUserId, getUser } from "../http/http";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth/react-native";

export default function SignUp() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  async function signupHandler({ email, password }) {
    const auth = getAuth();
    const { currentUser } = auth;
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        authCtx.userHandler({
          userId: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          idToken: user.accessToken
        });
        authCtx.authenticate(user);
        await storeUserId(user);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
    return currentUser;
  }

  useEffect(() => {
    async function userHandler() {
      if (user) {
        console.log("user", user);
        await getUser(user && user.accessToken);
      }
    }
    userHandler();
  }, [user]);

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
