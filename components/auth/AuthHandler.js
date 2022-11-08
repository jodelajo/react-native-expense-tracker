import { LoginUser } from "./CreateUser";
import { getUser, fetchResults, fetchCourses } from "../../http/http";

export default async function AuthHandler(
  setIsLoading,
  email,
  password,
  authCtx,
  resultsCtx,
  AsyncStorage
) {
  setIsLoading(true);
  try {
    const response = await LoginUser(email, password, setIsLoading);
    // console.log('response in authhandler', response )
    authCtx.authenticate(response.idToken);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("refreshToken", response.refreshToken);
    // 
    const userProfile = await getUser(response.idToken);
    console.log('userprofile in authhandler', userProfile )
    authCtx.userHandler({
      userId: userProfile[0].localId,
      displayName: userProfile[0].displayName,
      photoUrl: userProfile[0].photoUrl,
      refreshToken: userProfile[0].refreshToken,
      email: userProfile[0].email,
    });

    const results = await fetchResults(response.localId, response.idToken);
    resultsCtx.setResults(results);
    const courses = await fetchCourses(response.localId, response.idToken);
    resultsCtx.setCurrentCourses(courses);
    // console.log("courses in login", courses);
  } catch (error) {
    setError(error.toString());
    setIsLoading(false);
  }
  setIsLoading(false);
}
