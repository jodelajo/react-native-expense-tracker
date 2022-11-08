import React, { createContext, useState, useEffect } from "react";
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

async function setLocalStorage() {
  const userId = await AsyncStorage.getItem("userId")
  {userId && setUser(userId)}
  console.log('userId', userId)
  console.log('user', user)
  const token = await AsyncStorage.getItem("token")
  {authToken && setAuthToken(token)}
  console.log('token', token)
}
useEffect(() => {
setLocalStorage()
}, [])
 
console.log('current user', user)

  function authenticate(token) {
    AsyncStorage.setItem("token", token);

    setAuthToken(token);
  }

  function userHandler(user) {
    setUser(user);
    console.log('user in auth', user)
  }

  function logout(setResults) {
    setAuthToken(null);
    setResults(null);
    setUser(null);
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("displayName");
    AsyncStorage.removeItem("photoUrl");
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("localId");
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
