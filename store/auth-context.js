import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth/react-native";

export const AuthContext = createContext({
  token: "",
  currentUser: {},
  isAuthenticated: false,
  authenticate: (token) => {},
  userHandler: (currentUser) => {},
  logout: (setResults) => {},
});
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState();

  async function setAuthLocalStorage() {
    const token = await AsyncStorage.getItem("token");
    setAuthToken(token);
    const displayName = await AsyncStorage.getItem("displayName");
    const photoUrl = await AsyncStorage.getItem("photoUrl");
    const uid = await AsyncStorage.getItem("uid");
    setUser({
      displayName: displayName,
      photoUrl: photoUrl,
      uid: uid,
      idToken: token,
    });
  }

  useEffect(() => {
    if (user === undefined) {
      setAuthLocalStorage();
    }
  }, []);

  console.log("current user", user);

  async function authenticate(token) {
    setAuthToken(token);
  }

  function userHandler(user) {
    setUser(user);
    console.log("user in auth", user);
  }

  async function logout(setResults, setCurrentCourses) {
    const auth = getAuth();
    try {
      const result = await signOut(auth);
      console.log("result sign out", result);
      setAuthToken();
      setResults();
      setUser();
      setCurrentCourses();
      AsyncStorage.multiRemove([
        "displayName",
        "photoUrl",
        "token",
        "courses",
        "results",
        "uid",
        "recentResults",
      ]);
    } catch (error) {
      console.log(error);
    }
    console.log("user after signout", user);
  }

  const value = {
    currentUser: user,
    userHandler: userHandler,
    setUser: setUser,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
