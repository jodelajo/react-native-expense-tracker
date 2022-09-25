// import axios from "axios";

// const API_KEY = "AIzaSyCDubyiZeSPS4_8DSkhUIkYXACZPSxqGVY";
// const BACKEND_URL = "https://sasha-game-dev-default-rtdb.europe-west1.firebasedatabase.app";

//   export async function storeResult(resultData) {
//     const response = await axios.post(BACKEND_URL + "/id.json", resultData);
//     const id = response.data.name;
//     return id;
//   }

// export async function createUser(email, password) {
//   const response = await axios.post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
//       API_KEY,
//     {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     }
//   );
//   await storeResult(response.data);
// }
