'use client'

import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();



export function AuthProvider(props) {
    const { children } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true);
                setCurrentUser(user);

                if (!user) { return }

                // we have found a user, let us check the database

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                console.log("fetching user data");

                let firebaseData = { subscriptions: [] }; // default data for new user

                if (docSnap.exists()) {
                    console.log("found user data");
                    firebaseData = docSnap.data();
                } else {
                    console.log("did not found user data");
                }

                setUserData(firebaseData);

            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser, userData, loading, setLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}