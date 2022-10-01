import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;

export async function storeResult(resultData, userId) {
  console.log('store result', userId)
  const response = await axios.post(url + `/userId/${userId}/results.json`, resultData);
  const id = response.data.name;
  return id;
}

export async function fetchResults(userId) {
  console.log('userid in http', userId)
  const response = await axios.get(url + `/userId/${userId}/results.json`);
  // console.log('response', response.data)
  const results = [];

  for (const key in response.data) {
    const resultObj = {
      id: key,
      course: response.data[key].course,
      date: new Date(response.data[key].date),
      major: response.data[key].major,
      result: response.data[key].result,
      amount: response.data[key].amount,
    };
    results.push(resultObj);
    // console.log('results', results)
  }
  return results;
}

export function updateResult(id, resultData, userId) {
  console.log('resultdata in http')
  return axios.put(url + `/userId/${userId}/results/${id}.json`, resultData);
}

export function deleteResult(id, userId) {
  return axios.delete(url + `/userId/${userId}/results/${id}.json`);
}

export async function storeUserId(resultData) {
  console.log("result data", resultData.localId);
  const response = await axios.post(url + "/userId.json", resultData);

  const id = response.data.name;
  // console.log('http id store', id)
  return id;
}


// export default async function fetchUser(userId) {
//   console.log('userid in Fetchuser', userId)
//   const users = [];
//   const user = []
//   const response = await axios.get(url + `/userId.json`);
//   // users.push(response.data);
//   console.log('response data in Fetchuser', response.data)
//   const currentUser = [];

//   // console.log('users', Object.entries(users[0]))
//   const usersArray = Object.entries(response.data?.userId || response.data)
//   console.log('usersArray', usersArray)
  
//   usersArray.find(curUser => {
//     // console.log('user', curUser[1].email)
//     if (curUser[1].email === userId) {
//       user.push(curUser)
//     }
//   })
//   return user
// }
