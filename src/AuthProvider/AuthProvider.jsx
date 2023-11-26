import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Config/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ggProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const register = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const login = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const googleLogin = () => {
    setLoading;
    return signInWithPopup(auth, ggProvider);
  };

  const gitLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, gitProvider);
  };
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (inUser) => {
      setUser(inUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const values = {
    user,
    loading,
    register,
    login,
    googleLogin,
    gitLogin,
    logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
