import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserInfo, setCurrentUserInfo] = useState([]);
    

    const signInWithGoogle = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const handleSignOut = () => {
        signOutUser().then(() => {
            setUser(null);
            setLoading(false);
        }).catch(err => err);
    }

    const createAccountWithEmailAndPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithEmailAndPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);  
            axios.get(`https://crack-ai-server-lovat.vercel.app/users/${currentUser?.email}`).then(data => setCurrentUserInfo(data.data[0])
        )      
        });
        return () => unSubscribe();
    }, [])

    const values = {
        user,
        setUser,
        setLoading,
        signInWithGoogle,
        handleSignOut,
        loading,
        createAccountWithEmailAndPass,
        signInWithEmailAndPass,
        currentUserInfo
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;