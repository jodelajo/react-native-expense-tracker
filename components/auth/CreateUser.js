import axios from "axios";
import { storeUserId } from "../UI/http";
import { REACT_APP_API_KEY } from "@env";

export async function Authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${REACT_APP_API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  if (mode === "signUp") {
    await storeUserId(response.data);
  }

  const token = response.data.idToken;
  return token;
}

export function CreateUser(email, password) {
  return Authenticate("signUp", email, password);
}

export function LoginUser(email, password) {
  return Authenticate("signInWithPassword", email, password);
}
