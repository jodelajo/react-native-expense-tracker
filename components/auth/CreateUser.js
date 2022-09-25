import axios from "axios";
import { StoreResult } from "../manageResult/StoreResult";

const API_KEY = "AIzaSyCDubyiZeSPS4_8DSkhUIkYXACZPSxqGVY";

// export async function Authenticate(mode, email, password) {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
//   const response = await axios.post(url, {
//     email: email,
//     password: password,
//     returnSecureToken: true,
//   });
// }

export async function CreateUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  await StoreResult(response.data);
  console.log("response data", response.data);
}

export async function LoginUser(email, password) {
    const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log("response data login", response.data);
    }
