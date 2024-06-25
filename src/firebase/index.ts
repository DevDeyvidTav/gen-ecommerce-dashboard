import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// //todo: colocar no .env
const firebaseConfig = {
  apiKey: "AIzaSyC1H_woM_VPHdEACtbJD4KdG_GVaZieJ_Y",
  authDomain: "gen-ecomm.firebaseapp.com",
  projectId: "gen-ecomm",
  storageBucket: "gen-ecomm.appspot.com",
  messagingSenderId: "378654791780",
  appId: "1:378654791780:web:20f95c778c13fb0c43a771",
  measurementId: "G-5W053BC1NT"
};

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_apikey,
//     authDomain: process.env.NEXT_PUBLIC_authDomain,
//     projectId: process.env.NEXT_PUBLIC_projectId,
//     storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//     messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderID,
//     appId: process.env.NEXT_PUBLIC_appId,
//     measurementId: process.env.NEXT_PUBLIC_measurementId
// }

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);