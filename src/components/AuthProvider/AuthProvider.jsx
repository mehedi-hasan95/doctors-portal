import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/Firebase.inin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient()


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user with Email
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Update User 
    const updateUser = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }

    // Update UserName and PhotoURL
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Login
    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // Sign Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // state observer 

    useEffect(() => {
        const usSubscribed = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => usSubscribed();
    }, [])

    const authInfo = {
        user, createUser, logIn, updateUser, logOut, googleLogin, loading
    }
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={authInfo}>
                {children}
                <ToastContainer position="top-right" />
            </AuthContext.Provider>
        </QueryClientProvider>

    );
};

export default AuthProvider;