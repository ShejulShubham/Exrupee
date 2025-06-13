'use client'

import { auth, db } from "@/firebase";
import { subscriptions } from "@/utils";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser(null);
        setUserData(null);
        return signOut(auth);
    }

    async function saveToFirebase(data) {
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, {
                subscriptions: data
            }, { merge: true })

        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleAddSubscription(newSubscription) {
        // more than 30 subscriptions are not allowed

        if (userData.subscriptions.length > 30) { return }

        // modify the local state (global context)
        const newSubscriptions = [...userData.subscriptions, newSubscription];

        setUserData({ subscriptions: newSubscriptions });

        //write the changes to our firebase database (asynchronous)
        await saveToFirebase(newSubscriptions);

    }

    async function handleEditSubscription(index) {
        // before we delete, make sure we open up the input and prefill all the values with the entry we are going to edit


        // look up subscription at that index and delete it
        // use the delete handler 

    }

    async function handleDeleteSubscription(index) {
        // delete the entry at that index
        const newSubscriptions = userData.subscriptions.filter((value, valueIndex) => {
            return valueIndex !== index;
        });

        setUserData({ subscriptions: newSubscriptions });

        await saveToFirebase(newSubscriptions);

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setCurrentUser(user);

                if (!user) { return }

                // we have found a user, let us check the database

                setLoading(true);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                console.log("fetching user data");

                // let firebaseData = { subscriptions }
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
        currentUser, userData, loading, setLoading, signup, login, logout, handleAddSubscription, handleDeleteSubscription
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