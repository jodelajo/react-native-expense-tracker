import axios from "axios";
import envs from "../config/env";
const { BACKEND_URL, API_KEY } = envs;
const url = BACKEND_URL;

export async function storeResult(resultData, userId, token) {
  console.log('token', token)
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

export async function storeUserId(resultData) {
  const response = await axios.put(
    url + `/users/${resultData.uid}.json?auth=` + resultData.accessToken,
    resultData
  );

  const id = response.data.uid;
  return id;
}

export async function getUser(token) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
    { idToken: token }
  );

  return response.data.users;
}

export async function fetchUser(userId, token) {
  const response = await axios.get(url + `/users/${userId}.json?auth=` + token);
  
  return response.data;
}

export async function storeCourse(resultData, userId, token) {
  const response = await axios.put(
    url + `/users/${userId}/courses.json?auth=` + token,
    resultData
  );
  
  return response.data;
}

export async function fetchCourses(userId, token) {
  
  const response = await axios.get(
    url + `/users/${userId}/courses.json?auth=` + token
  );
    const courses = response.data
  
  return courses;
}