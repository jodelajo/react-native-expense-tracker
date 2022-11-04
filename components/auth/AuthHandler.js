// import { useContext } from "react";
// import { AuthContext } from "../../store/auth-context";
// import { ResultsContext } from "../../store/results-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginUser } from "./CreateUser";
import { getUser, fetchResults, fetchCourses } from "../../http/http";

export default async function AuthHandler(setIsLoading, email, password, authCtx, resultsCtx, AsyncStorage) {
    // const authCtx = useContext(AuthContext)
    // const resultsCtx = useContext(ResultsContext)
    setIsLoading(true);
    try {
      const response = await LoginUser(email, password, setIsLoading);
      authCtx.authenticate(response.idToken);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("refreshToken", response.refreshToken);
      const userProfile = await getUser(response.idToken);

      authCtx.userHandler({
        userId: userProfile[0].localId,
        displayName: userProfile[0].displayName,
        photoUrl: userProfile[0].photoUrl,
        refreshToken: userProfile[0].refreshToken,
        email: userProfile[0].email,
      });

      const results = await fetchResults(response.localId, response.idToken);
      resultsCtx.setResults(results);
      const courses = await fetchCourses(response.localId, response.idToken)
      resultsCtx.setCurrentCourses(courses)
      console.log('courses in login')
    } catch (error) {
      // setError(error.toString());
      setIsLoading(false);
    }
    setIsLoading(false);
}