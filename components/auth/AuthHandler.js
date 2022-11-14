// import { LoginUser } from "./CreateUser";
// import { fetchCourses } from "../../http/http";
// // import { auth } from "../../config/firebase";
// import { onAuthStateChanged, getAuth, getIdToken } from "firebase/auth/react-native";

// export default async function AuthHandler(
//   setIsLoading,
//   email,
//   password,
//   data,
//   authCtx,
//   resultsCtx,
//   AsyncStorage
// ) {
//   // setIsLoading(true);
//   try {
//     // const response = await LoginUser(email, password, setIsLoading);
//     // console.log("response in authhandler", response);
//     // const auth = getAuth()
//     // onAuthStateChanged(auth, (response) => {
//     //   if (response) {
//     //     console.log(response)
//     //     response.getIdToken().then(function(data) {
//     //       console.log('data', data)
//     //     });
//     //   }
//     // })
  
//     // const auth = getAuth()
//     // console.log('auth', auth.currentUser)
//     console.log('response', data)
//     authCtx.authenticate(data);

//     AsyncStorage.setItem("email", email);
//     // AsyncStorage.setItem("refreshToken", response.refreshToken);
//     AsyncStorage.setItem("displayName", response.displayName);
//     AsyncStorage.setItem("photoUrl", response.photoURL);
//     AsyncStorage.setItem("localId", response.uid);

//     authCtx.userHandler({
//       userId: response.uid,
//       displayName: response.displayName,
//       photoUrl: response.photoURL,
//       // refreshToken: response.refreshToken,
//       email: response.email
//     });

//     // const results = await fetchResults(response.localId, token);
//     // resultsCtx.setResults(results);
//     const courses = await fetchCourses(response.uid, response.accessToken);
//     resultsCtx.setCurrentCourses(courses);
//     console.log("courses in login", courses);
//   } catch (error) {
//     // setError(error.toString());
//     // setIsLoading(false);
//     console.log(error)
//   }
//   // setIsLoading(false);
// }
