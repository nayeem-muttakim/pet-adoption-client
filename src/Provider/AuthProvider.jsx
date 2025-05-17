import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Config/firebase.config";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();
  const ggProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const register = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const login = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, ggProvider);
  };

  const fbLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, fbProvider);
  };

  const updateUser = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (inUser) => {
      setUser(inUser);
      if (inUser) {
        //  get token and store client
        const userInfo = { email: inUser.email };
        await axiosPublic.post("/jwt", userInfo).then(async (res) => {
          if (res.data.token) {
            await localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        // remove token if stored
        localStorage.removeItem("access-token");
      }
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
    fbLogin,
    updateUser,
    logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
