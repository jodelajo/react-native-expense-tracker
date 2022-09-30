import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;

export default async function FetchUser(userId) {
  const users = [];
  const response = await axios.get(url + `/userId.json`);
  users.push(response.data);

  const currentUser = [];
  users.map((user) => {
    const thisUser = Object.values(user);
    thisUser.find((user) => user.email === userId);
  });

  users.find((user) => {
    for (const [key, value] of Object.entries(user)) {
      if (value.email === userId) {
        currentUser.push(key);
      }
    }
  });
  console.log("result", currentUser[0]);

  return currentUser[0];
}
