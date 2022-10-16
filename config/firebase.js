import {REACT_APP_API_KEY_DEV, REACT_APP_BACKEND_DEV_URL, AUTH_DOMAIN_DEV, PROJECT_ID_DEV, STORAGE_BUCKET_DEV, MESSAGING_SENDER_ID_DEV, APP_ID_DEV, MEASUREMENT_ID_DEV} from '@env'
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage'

export const firebaseConfig = {
  apiKey: REACT_APP_API_KEY_DEV,
  authDomain: AUTH_DOMAIN_DEV,
  databaseURL: REACT_APP_BACKEND_DEV_URL,
  projectId: PROJECT_ID_DEV,
  storageBucket: STORAGE_BUCKET_DEV,
  messagingSenderId: MESSAGING_SENDER_ID_DEV,
  appId: APP_ID_DEV,
  measurementId: MEASUREMENT_ID_DEV
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);