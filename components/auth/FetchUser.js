import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";


const url = REACT_APP_BACKEND_URL;

export default async function FetchUser(userId) {
    // const [currentUserId, setCurrentUserId] = useState()
    // console.log("userid in http", userId.email);
    const users = [];
    const response = await axios.get(url + `/userId.json`);
    users.push(response.data);
    // console.log("http id fetch", users);
  
    const currentUser = [];
    users.map((user) => {
      const thisUser = Object.values(user);
      thisUser.find((user) => user.email === userId.email);
    });
  
    users.find((user) => {
      // console.log("user", user);
      for (const [key, value] of Object.entries(user)) {
        if (value.email === userId.email) {
          currentUser.push(key);
        }
      }
      // Object.values(user) === currentUser[0]
    });
    console.log("result", currentUser[0]);
  
    return currentUser[0];
  }
  