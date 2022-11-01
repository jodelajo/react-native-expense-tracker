import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  function authenticate(token) {
    AsyncStorage.setItem("token", token);

    setAuthToken(token);
  }

  function userHandler(user) {
    setUser(user);
  }

  function logout(setResults) {
    setAuthToken(null);
    setResults(null);
    setUser(null);

    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("displayName");
    AsyncStorage.removeItem("photoUrl");
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
