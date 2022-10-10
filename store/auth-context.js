import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext({
  token: "",
  userId: "",
  refreshToken: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  userHandler: (userId) => {},
  logout: (setResults) => {},
});
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [rToken, setRToken] = useState();
  const [user, setUser] = useState();

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }

  function userHandler(userId) {
    setUser(userId);
  }

  function logout(setResults) {
    setAuthToken(null);
    setResults(null);
    setUser(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
  }


  const value = {
    userId: user,
    userHandler: userHandler,
    setUser: setUser,
    refreshToken: rToken,
    setRToken: setRToken,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
