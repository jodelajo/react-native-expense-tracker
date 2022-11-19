import React, { useState, useContext, useEffect } from "react";
import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { ResultsContext } from "../store/results-context";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { fetchCourses, fetchResults, getUser } from "../http/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  const addToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      console.log("doet iets", token);
      if (token === undefined) {
        // await AsyncStorage.removeItem("token")
        authCtx.logout(resultsCtx.setResults, resultsCtx.setCurrentCourses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addName = async (displayName) => {
    try {
      await AsyncStorage.setItem("displayName", displayName);
    } catch (error) {
      console.log(error);
    }
  };

  const addProfilePicture = async (pic) => {
    try {
      await AsyncStorage.setItem("photoUrl", pic);
    } catch (error) {
      console.log(error);
    }
  };

  const addUid = async (uid) => {
    try {
      await AsyncStorage.setItem("uid", uid);
    } catch (error) {
      console.log(error);
    }
  };

  const addCourses = async (courses) => {
    try {
      await AsyncStorage.setItem("courses", JSON.stringify(courses));
    } catch (error) {
      console.log(error);
    }
  };
  const addResults = async (results) => {
    try {
      await AsyncStorage.setItem("results", JSON.stringify(results));
    } catch (error) {
      console.log(error);
    }
  };

  function loginHandler({ email, password }) {
    const auth = getAuth();
    const { currentUser } = auth;
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user in login", user);
        setUser(user);
        authCtx.userHandler({
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          idToken: user.accessToken,
        });
        authCtx.authenticate(user);
        addToken(user.accessToken);
        addName(user.displayName);
        addProfilePicture(user.photoURL);
        addUid(user.uid);
        authCtx.setAuthLocalStorage();
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
    return currentUser?.accessToken;
  }

  useEffect(() => {
    async function userHandler() {
      if (user) {
        console.log("user", user);
        await getUser(user && user.accessToken);
      }
    }
    async function courseHandler() {
      if (user !== undefined) {
        setIsLoading(true);
        try {
          const courses = await fetchCourses(user.uid, user.accessToken);
          resultsCtx.setCurrentCourses(courses);
          addCourses(courses);
        } catch (error) {
          console.log(error);
          setError(error.toString());
        }
        setIsLoading(false);
      }
    }
    async function resultsHandler() {
      console.log("user", user);
      if (user !== undefined) {
        setIsLoading(true);
        try {
          const results = await fetchResults(user.uid, user.accessToken);
          resultsCtx.setResults(results);
          addResults(results);
          console.log(results);
        } catch (error) {
          console.log(error);
          setError(error.toString());
        }
        setIsLoading(false);
      }
    }
    userHandler();
    resultsHandler();
    courseHandler();
    authCtx.authenticate(user);
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
