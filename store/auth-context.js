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
  const [refreshToken, setRefreshToken] = useState();
  const [userName, setUserName] = useState();

  async function setLocalStorage() {
    const userId = await AsyncStorage.getItem("userId");
    setUser(userId);
    console.log("userId", userId);
    console.log("user", user);
    const token = await AsyncStorage.getItem("token");
    setAuthToken(token);
    const rToken = await AsyncStorage.getItem("refreshToken");
    setRefreshToken(rToken);
    console.log("token", rToken);
  }
  useEffect(() => {
    setLocalStorage();
  }, []);

  console.log("current user", user);

  function authenticate(token) {
    console.log("token in auth context", token);
    // AsyncStorage.setItem("token", token.idToken);

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
      setAuthToken(null);
      setResults([]);
      setUser(null);
      setCurrentCourses(null);
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("displayName");
      AsyncStorage.removeItem("photoUrl");
      AsyncStorage.removeItem("email");
      AsyncStorage.removeItem("localId");
    } catch (error) {
      console.log(error);
    }
    console.log("user after signout", user);
  }

  const value = {
    refreshToken,
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
