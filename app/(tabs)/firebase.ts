import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔥 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVOjLFhe7tLiAGBrbTiUCD2gUSQoHleIA",
  authDomain: "marketall-14.firebaseapp.com",
  projectId: "marketall-14",
  storageBucket: "marketall-14.firebasestorage.app",
  messagingSenderId: "1006784104060",
  appId: "1:1006784104060:android:42e9a8fce65bd2a16babf9"
};

// 🚀 Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Autenticação
export const auth = getAuth(app);

// 🗄️ Firestore (banco de dados)
export const db = getFirestore(app);

// 📦 Storage (upload de arquivos)
export const storage = getStorage(app);

// (opcional) export do app se precisar futuramente
export default app;

