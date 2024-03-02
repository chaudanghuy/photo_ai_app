import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/accounts/login", {
        email: email,
        password: password
      });

      if (response.data.token) {
        setUserToken(response.data.token);
        setCurrentUser(response.data.account);
        await AsyncStorage.setItem('userToken', response.data.token);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = () => {
    setUserToken(null);
    setCurrentUser(null);
    AsyncStorage.removeItem('userToken');
  }

  const value = {
    userToken,
    currentUser,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}