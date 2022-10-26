import axios from "axios";
import envs from "../../config/env";
// import { AuthContext } from "../../store/auth-context";
// import { useContext } from "react";
const { BACKEND_URL } = envs;
const url = BACKEND_URL;
const { API_KEY } = envs;

export async function storeResult(resultData, userId, token) {
  const response = await axios.post(
    url + `/userId/${userId}/results.json?auth=` + token,
    resultData
  );
  const id = response.data.name;
  return id;
}

export async function fetchResults(userId, token) {
  console.log('userId in http', userId)
  console.log('token', token)
  // const userId = user.userId
  const response = await axios.get(
    url + `/userId/${userId}/results.json?auth=` + token
  );
  const results = [];

  for (const key in response.data) {
    const resultObj = {
      id: key,
      course: response.data[key].course,
      date: new Date(response.data[key].date),
      type: response.data[key].type,
      confirmed: response.data[key].confirmed,
      result: response.data[key].result,
      amount: response.data[key].amount,
    };
    results.push(resultObj);
  }
  return results;
}

export function updateResult(id, resultData, userId, token) {
  return axios.put(
    url + `/userId/${userId}/results/${id}.json?auth=` + token,
    resultData
  );
}

export function deleteResult(id, userId, token) {
  return axios.delete(
    url + `/userId/${userId}/results/${id}.json?auth=` + token
  );
}

export async function storeUserId(resultData, token) {
  console.log("result data", resultData);
  const response = await axios.post(
    url + "/userId.json?auth=" + token,
    resultData
  );

  const id = response.data.name;
  return id;
}

export async function getUser(token) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    { idToken: token }
  );
  console.log("response getUser", response.data.users);
  return response.data.users;
}

// export async function tryCatch() {
//   try {
//     const data = await promise
//     return [data, null]
//   } catch (error) {
//     console.error(error)
//     return [null, error]
//   }
// }