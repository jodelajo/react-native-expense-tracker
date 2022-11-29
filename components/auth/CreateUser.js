// import axios from "axios";
// import { storeUserId } from "../../http/http";
// import envs from "../../config/env";
// import { Alert, Platform } from "react-native";
// import { errorMessages } from "../../constants/errorMessages";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { auth } from "../../config/firebase";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken, onAuthStateChanged } from "firebase/auth/react-native";

// const { API_KEY } = envs;



// export default async function Authenticate(mode, email, password, setIsLoading) {
 
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
//   try {

   
//     // const token = await getIdToken(currentUser, true)
//     // console.log('token', token)

//     // const response = await axios.post(url, {
//     //   email: email,
//     //   password: password,
//     //   returnSecureToken: true,
//     // });

//     // console.log('response in createuser', response)
//     // AsyncStorage.setItem("userId", response.data.localId)
//     // AsyncStorage.setItem("token", response.data.idToken)
//     if (mode === "signUp") {

      
//       createUserWithEmailAndPassword(auth, email, password)
//         .then(async (userCredential) => {
//           // Signed in 
//           const user = userCredential.user;

//           console.log('user', user)
//           await storeUserId(user);
//         })
//         return currentUser;
//     }
//     if (mode === "signInWithPassword") {
//       signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//        console.log('user in login', user)
//       //  return user;
//       })
//       return currentUser.accessToken;
//     }
   

   
    
//   } catch (error) {
//     console.log(error)
//     // const message = Object.fromEntries(
//     //   Object.entries(errorMessages).filter(([key, value]) => {
//     //     console.log("error", error.response.data.error.message);
//     //     if (key === error.response.data.error.message) {
//     //       return value;
//     //     }
//     //   })
//     // );

//     // if (Platform.OS === "web") {
//     //   console.log("message", Object.values(message));
//     //   alert(Object.values(message).toString());
//     // } else {
//     //   Alert.alert(Object.values(message).toString());
//     // }
//     setIsLoading(false)
//   }
// }



// export async function CreateUser(email, password, setIsLoading) {
//   const auth = getAuth();
//   const {currentUser} = auth
//   console.log('currentUser', currentUser)
//   createUserWithEmailAndPassword(auth, email, password)
//         .then(async (userCredential) => {
//           // Signed in 
//           const user = userCredential.user;

//           console.log('user', user)
//           await storeUserId(user);
//         })
//         return currentUser;
//   // return Authenticate("signUp", email, password, setIsLoading);
// }

// export async function LoginUser(email, password, setIsLoading) {
//   const auth = getAuth();
//   const {currentUser} = auth
//   console.log('currentUser', currentUser)
//   signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//        console.log('user in login', user)
//       //  return user.accessToken;
//       })
//       return currentUser;

//   // return Authenticate("signInWithPassword", email, password, setIsLoading);
// }
