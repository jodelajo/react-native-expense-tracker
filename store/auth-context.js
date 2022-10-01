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
    setAuthToken(token);
  }

  function userHandler(userId) {
    console.log("userid in context", userId);
    setUser(userId);
  }

  function logout(setResults) {
    setResults({});
    setUser("");
    setAuthToken(null);
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
