import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";


const url = REACT_APP_BACKEND_URL;

export default async function FetchUser(userId, token) {
  // const authCtx = useContext(AuthContext)
  console.log('token', token)
  console.log("userid in Fetchuser", userId);
  const user = [];
  const response = await axios.get(url + `/userId.json?auth=` + token);
console.log('???', response.data)
  const usersArray = Object.entries(response.data?.userId || response.data);
  usersArray.find(
    (curUser) => curUser[1].email === userId && user.push(curUser)
  );
  return user;
}
