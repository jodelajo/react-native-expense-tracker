import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;


export default async function FetchUser(userId) {
  console.log('userid in Fetchuser', userId)
  const users = [];
  const user = []
  const response = await axios.get(url + `/userId.json`);
  // users.push(response.data);
  console.log('response data in Fetchuser', response.data)
  const currentUser = [];

  // console.log('users', Object.entries(users[0]))
  const usersArray = Object.entries(response.data?.userId || response.data)
  console.log('usersArray', usersArray)
  
  usersArray.find(curUser => {
    // console.log('user', curUser[1].email)
    if (curUser[1].email === userId) {
      user.push(curUser)
    }
  })
  return user
}

