import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext({
  token: "",
  currentUser: {},
  // displayName: "",
  // avatar: "",
  // refreshToken: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  userHandler: (currentUser) => {},
  logout: (setResults) => {},
});
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  // const [rToken, setRToken] = useState();
  const [user, setUser] = useState();
  // const [name, setName] = useState()
  // const [photoUrl, setPhotoUrl] = useState()

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
   
    setAuthToken(token);
    // console.log('token in authContext', token)
  }

  function userHandler(user) {
    // console.log('user in auth', user)
    setUser(user);
  }

  function logout(setResults) {
    setAuthToken(null);
    setResults(null);
    setUser(null);
    // setName(null)
    // setPhotoUrl(null)
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("displayName");
    AsyncStorage.removeItem("photoUrl");
  }


  const value = {
    // avatar: photoUrl,
    // setPhotoUrl: setPhotoUrl,
    // displayName: name,
    // setName, setName,
    currentUser: user,
    userHandler: userHandler,
    setUser: setUser,
    // refreshToken: rToken,
    // setRToken: setRToken,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
