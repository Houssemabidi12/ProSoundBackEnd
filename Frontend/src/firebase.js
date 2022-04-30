import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnA1v9OBu85UafQyzs0jv_WSG5BxzyNC8",
  authDomain: "prom-dad0e.firebaseapp.com",
  projectId: "prom-dad0e",
  storageBucket: "prom-dad0e.appspot.com",
  messagingSenderId: "347669049330",
  appId: "1:347669049330:web:591ec3208120598b84c56b",
  measurementId: "G-HCNRBQ4SZL",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
export default storage;
