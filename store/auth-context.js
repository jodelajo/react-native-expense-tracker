import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  userHandler: (userId) => {},
  logout: (setResults) => {},
});
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState();
 

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }

  function userHandler(userId) {
    console.log("userid in context", userId);
    setUser(userId);
  }

  function logout(setResults) {
    setAuthToken(null);
    setResults(null);
    setUser(null);
    AsyncStorage.removeItem('token')
  }

  const value = {
    userId: user,
    userHandler,
    userHandler,
    setUser: setUser,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
