/*
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

console.log('sup')
console.log(process.env.FIREBASE_API_KEY)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,//Constants.manifest?.extra?.firebaseApiKey,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,//Constants.manifest?.extra?.firebaseAuthDomain,
	projectId: process.env.FIREBASE_PROJECT_ID,//Constants.manifest?.extra?.firebaseProjectId,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,// Constants.manifest?.extra?.firebaseStorageBucket,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,//Constants.manifest?.extra?.firebaseMessagingSenderId,
	appId: process.env.FIREBASE_APP_ID, //Constants.manifest?.extra?.firebaseAppId,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID, // Constants.manifest?.extra?.firebaseMeasurementId,
};

export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

*/