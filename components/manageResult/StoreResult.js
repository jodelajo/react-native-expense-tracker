import axios from "axios";

const BACKEND_URL = "https://sasha-game-dev-default-rtdb.europe-west1.firebasedatabase.app";

  export async function StoreResult(resultData) {
    console.log('result data', resultData.localId)
    const response = await axios.post(BACKEND_URL + "/id.json", resultData);

    const id = response.data.name;
    console.log('id', id)
    return id;
  }


