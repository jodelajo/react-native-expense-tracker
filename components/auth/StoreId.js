import axios from "axios";
import {REACT_APP_BACKEND_URL} from '@env'

const url = REACT_APP_BACKEND_URL


  export async function StoreId(resultData) {
    console.log('result data', resultData.localId)
    const response = await axios.post(url + "/id.json", resultData);

    const id = response.data.name;
    console.log('id', id)
    return id;
  }


