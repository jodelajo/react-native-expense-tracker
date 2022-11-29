import { initializeApp, getApps,  } from "firebase/app";
// import { initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged} from "firebase/auth/react-native"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import envs from "../config/env";
// import AsyncStorage from "@react-native-async-storage/async-storage";

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
console.log('getapps', getApps())
const app = initializeApp(firebaseConfig);

// export const authPersistence = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// })

export const db = getFirestore(app)
export const storage = getStorage(app);
