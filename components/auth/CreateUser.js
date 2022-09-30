import axios from "axios";
// import { StoreUserId } from "./StoreUserID";
import { storeUserId, fetchUser } from "../UI/http";
import FetchUser from "./FetchUser";
import {REACT_APP_API_KEY} from '@env'
import { AuthContext } from "../../store/auth-context";
import { useContext, useState } from "react";

export async function Authenticate(mode, email, password) {
  // const authCtx = useContext(AuthContext)
  // const [userId, setUserId] = useState()
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${REACT_APP_API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  if (mode === "signUp") {
    await storeUserId(response.data);
    console.log('response in creatuser', response.data)
    // setUserId(response.data.name)
    // console.log('userId in CreateUser', userId)
  }
  if (mode === "signInWithPassword") {
    await FetchUser(response.data);
    // console.log('?', authCtx.token)
    // setUserId(fetchUser(response.data))
  }
  const token = response.data.idToken;
  // console.log('userid', userId)
  // console.log('token in create user', token)
  return token;
}

export function CreateUser(email, password) {
  return Authenticate("signUp", email, password);
}

export function LoginUser(email, password) {
  return Authenticate("signInWithPassword", email, password);
 
}
