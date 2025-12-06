import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from '../Firebase/Firebase.config';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Login 
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // LogOut User
    const logOutUser = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    },[])


    const authInfo = {
        user,
        error,
        loading,
        loginWithGoogle,
        setError,
        setLoading,
        logOutUser
    }


    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;