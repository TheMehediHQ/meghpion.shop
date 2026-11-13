import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoDummyApiKeyForMeghpiyonGifts',
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || 'meghpiyon-gift.firebaseapp.com',
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || 'meghpiyon-gift',
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || 'meghpiyon-gift.appspot.com',
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456',
};

// Check if running in browser
export const isBrowser = typeof window !== 'undefined';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isBrowser) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export {
  app,
  auth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
export type { User };
