import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import envs from "../config/env";
// import { getAuth } from "firebase/auth/react-native";
// import { browserLocalPersistence, setPersistence, initializeAuth } from "firebase/auth"

const {
  API_KEY,
  AUTH_DOMAIN,
  BACKEND_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} = envs;

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: BACKEND_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: browserLocalPersistence
// })

// setPersistence(auth, browserLocalPersistence)
// console.log(auth)

export const storage = getStorage(app);
