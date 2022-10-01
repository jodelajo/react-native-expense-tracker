import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",  
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});
export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState()

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout(setResults) {
    setAuthToken(null)
    setResults({})
  }
  

  const value = {
    userId: user,
    setUser: setUser,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
