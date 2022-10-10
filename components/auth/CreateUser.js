import axios from "axios";
import { storeUserId } from "../UI/http";
import envs from '../../config/env'

const {API_KEY} = envs

export async function Authenticate(mode, email, password) {
  // const idToken = []
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });


  if (mode === "signUp") {
    await storeUserId(response.data, response.data.idToken);
  }

  const token = response.data.idToken;
  // idToken.push(response.data.idToken)
  // console.log('token', token)
  return token;
}


export function CreateUser(email, password) {
  return Authenticate("signUp", email, password);
}

export function LoginUser(email, password) {
  return Authenticate("signInWithPassword", email, password);
}
