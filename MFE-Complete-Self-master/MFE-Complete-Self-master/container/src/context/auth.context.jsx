// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const useAuth = () => {
//     const [user, setUser] = useState()

//     const toggleUser = () => {
//         const user = JSON.parse(localStorage.getItem("user"))
//         setUser(user)
//     }

//     useEffect(() => {
//         toggleUser()
//         console.log("toggling user")
//     }, [])

//     return {user, toggleUser}
// }

//new code
// src/components/context/auth.context.jsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const updateUser = useCallback(() => {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
    }, []);

    useEffect(() => {
        updateUser();
        console.log("AuthContext - User updated:", user);
    }, [updateUser]); //here firt there was not updateUser

    const setAuthUser = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        updateUser();
    };
    const toggleUser = useCallback(() => { // Add toggleUser
        updateUser();
      }, [updateUser]);

    return (
        <AuthContext.Provider value={{ user, updateUser, setAuthUser, toggleUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);