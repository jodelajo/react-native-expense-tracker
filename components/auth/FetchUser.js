import axios from "axios";
// import { REACT_APP_BACKEND_URL } from "@env";
import envs from '../../config/env'

const { BACKEND_URL} = envs
const url = BACKEND_URL;

// console.log('bachend', url)

export default async function FetchUser(userId, token) {
  console.log("userid in Fetchuser", userId);
  const user = [];
  const response = await axios.get(url + `/userId.json?auth=` + token);
  const usersArray = Object.entries(response.data?.userId || response.data);
  usersArray.find(
    (curUser) => curUser[1].email === userId && user.push(curUser)
  );
  return user;
}
