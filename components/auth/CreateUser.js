import React, { useState } from "react";
import axios from "axios";
import { storeUserId, getUser } from "../UI/http";
import envs from '../../config/env'
import { Alert, Platform } from "react-native";


const {API_KEY} = envs
 
export default async function Authenticate(mode, email, password) {
  // const [error, setError] = useState()
  // const idToken = []
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
try {
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log('create user response', response)
  if (mode === "signUp") {
    await storeUserId(response.data, response.data.idToken);
  }
  if (mode === "signInWithPassword") {
   await getUser(response.data.idToken)
  //  console.log('response in login', response)
  }

  const token = response.data.idToken;
  // console.log('token', token)
  return token;
} catch (error) {
  // console.log('error', error)
  if(Platform.OS === 'web') {
    alert(error.response.data.error.message)
  } else {
    Alert.alert(error.response.data.error.message)
  }
 
}

 
}


export function CreateUser(email, password) {
  return Authenticate("signUp", email, password);
}

export function LoginUser(email, password) {

  return Authenticate("signInWithPassword", email, password);
}
