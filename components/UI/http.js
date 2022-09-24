import axios from "axios";

const BACKEND_URL =
  "https://sasha-game-dev-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeResult(resultData) {
  const response = await axios.post(BACKEND_URL + "/results.json", resultData);
  const id = response.data.name
  return id
}
export async function fetchResults() {
    const response = await axios.get(BACKEND_URL + "/results.json");

    const results = []
    
    for (const key in response.data) {
        const resultObj = {
            id: key,
            course: response.data[key].course,
            date: new Date(response.data[key].date),
            major: response.data[key].major,
            result: response.data[key].result,
            amount: response.data[key].amount
        }
        results.push(resultObj)
    }
    return results
}
