import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;

export default async function FetchUser(userId) {
  console.log("userid in Fetchuser", userId);
  const user = [];
  const response = await axios.get(url + `/userId.json`);

  const usersArray = Object.entries(response.data?.userId || response.data);
  usersArray.find(
    (curUser) => curUser[1].email === userId && user.push(curUser)
  );
  return user;
}
