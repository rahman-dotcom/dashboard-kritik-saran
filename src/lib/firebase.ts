import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "dashboard-kritik-saran.firebaseapp.com",
  projectId: "dashboard-kritik-saran",
  storageBucket: "dashboard-kritik-saran.firebasestorage.app",
  messagingSenderId: "430564017550",
  appId: "1:430564017550:web:d4e5fc28cdf21713e810df"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);