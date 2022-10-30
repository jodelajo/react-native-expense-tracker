import axios from "axios";
import envs from "../../config/env";
const { BACKEND_URL } = envs;
const url = BACKEND_URL;
const { API_KEY } = envs;

export async function storeResult(resultData, userId, token) {
  const response = await axios.post(
    url + `/users/${userId}/results.json?auth=` + token,
    resultData
  );
  const id = response.data.name;
  return id;
}

export async function fetchResults(userId, token) {
  const response = await axios.get(
    url + `/users/${userId}/results.json?auth=` + token
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
    url + `/users/${userId}/results/${id}.json?auth=` + token,
    resultData
  );
}

export function deleteResult(id, userId, token) {
  return axios.delete(
    url + `/users/${userId}/results/${id}.json?auth=` + token
  );
}

export async function storeUserId(resultData, token) {
  console.log("result data", resultData);
  const response = await axios.put(
    url + `/users/${resultData.localId}.json?auth=` + token,
    resultData
  );

  const id = response.data.name;
  return id;
}


export async function fetchUser(userId, token) {
  const response = await axios.get(url + `/users/${userId}.json?auth=` + token);
  console.log('fetch user', response.data)
  
  return response.data;
}

export async function getUser(token) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    { idToken: token }
  );

  return response.data.users;
}

