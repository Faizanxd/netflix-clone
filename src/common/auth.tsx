// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzUzPb34xGJ8L40Ah1UU_6ldkY6uG4ew0",
  authDomain: "netflix-clone-bef24.firebaseapp.com",
  projectId: "netflix-clone-bef24",
  storageBucket: "netflix-clone-bef24.appspot.com",
  messagingSenderId: "355198920092",
  appId: "1:355198920092:web:c000761b4739a63521d459",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export type AuthContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = signOut(auth).then(() => setUser(null));

  return {
    user,
    signUp,
    signIn,
    signOut: signOutUser,
  };
}

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);
