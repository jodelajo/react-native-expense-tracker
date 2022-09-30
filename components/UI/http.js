import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;

export async function storeResult(resultData) {
  const response = await axios.post(url + "/results.json", resultData);
  const id = response.data.name;
  return id;
}
export async function fetchResults() {
  const response = await axios.get(url + "/results.json");

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
  }
  return results;
}

export function updateResult(id, resultData) {
  return axios.put(url + `/results/${id}.json`, resultData);
}

export function deleteResult(id) {
  return axios.delete(url + `/results/${id}.json`);
}

export async function storeUserId(resultData) {
  console.log("result data", resultData.localId);
  const response = await axios.post(url + "/userId.json", resultData);

  const id = response.data.name;
  // console.log('http id store', id)
  return id;
}

// export async function fetchUser(userId) {
//   // console.log("userid in http", userId.email);
//   const users = [];
//   const response = await axios.get(url + `/userId.json`);
//   users.push(response.data);
//   // console.log("http id fetch", users);

//   const currentUser = [];
//   users.map((user) => {
//     const thisUser = Object.values(user);
//     thisUser.find((user) => user.email === userId.email);
//   });

//   users.find((user) => {
//     // console.log("user", user);
//     for (const [key, value] of Object.entries(user)) {
//       if (value.email === userId.email) {
//         currentUser.push(key);
//       }
//     }
//     // Object.values(user) === currentUser[0]
//   });
//   console.log("result", currentUser[0]);

//   return currentUser[0];
// }
