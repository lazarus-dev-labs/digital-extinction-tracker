import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = 
  {
  "apiKey": process.env.BUN_PUBLIC_API_KEY,
  "authDomain": process.env.BUN_PUBLIC_AUTH_DOMAIN,
  "projectId": process.env.BUN_PUBLIC_PROJECT_ID,
  "storageBucket": process.env.BUN_PUBLIC_STORAGE_BUCKET,
  "messagingSenderId": process.env.BUN_PUBLIC_MESSAGING_SENDER_ID,
  "appId": process.env.BUN_PUBLIC_APP_ID,
  "measurementId": process.env.BUN_PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export default app;
