import axios from "axios";
import { REACT_APP_BACKEND_URL } from "@env";

const url = REACT_APP_BACKEND_URL;

export async function storeResult(resultData, userId) {
  const response = await axios.post(
    url + `/userId/${userId}/results.json`,
    resultData
  );
  const id = response.data.name;
  return id;
}

export async function fetchResults(userId) {
  console.log("userid in http", userId);
  const response = await axios.get(url + `/userId/${userId}/results.json`);
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

export function updateResult(id, resultData, userId) {
  return axios.put(url + `/userId/${userId}/results/${id}.json`, resultData);
}

export function deleteResult(id, userId) {
  return axios.delete(url + `/userId/${userId}/results/${id}.json`);
}

export async function storeUserId(resultData) {
  console.log("result data", resultData.localId);
  const response = await axios.post(url + "/userId.json", resultData);

  const id = response.data.name;
  return id;
}
