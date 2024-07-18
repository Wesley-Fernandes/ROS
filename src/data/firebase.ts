import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_API_KEY');
} else if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
} else if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID');
} else if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
} else if (!process.env.NEXT_PUBLIC_FIREBASE_MSG_ID) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_MSG_ID');
} else if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) {
  throw new Error('Missing NEXT_PUBLIC_FIREBASE_APP_ID');
}
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
