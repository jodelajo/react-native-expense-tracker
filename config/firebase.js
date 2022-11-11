import { initializeApp } from "firebase/app";
import { initializeAuth} from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import { getStorage } from "firebase/storage";
import envs from "../config/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
// app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const storage = getStorage(app);
