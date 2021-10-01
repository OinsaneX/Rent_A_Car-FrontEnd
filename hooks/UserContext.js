import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  
  useEffect(() => {
    getUser(()=>{});
  
  }, []);


  const getUser = async (callback) => {
    const idToken = localStorage.getItem("token");
    if (idToken) {
        console.log(idToken)
      await axios.get(`https://desolate-sea-14156.herokuapp.com/userlogged/${idToken}`)
      .then((response) =>{
        console.log(response.data)
         if( response.data){
            setUser(response.data)
            callback(response.data)
         }
         else{
            setUser(null) 
            callback(null)
            localStorage.removeItem("token")
         } 
      })
        
    } else {
      callback(null)
      setUser(null);
    }};

  return (
    <AuthContext.Provider value={{ user, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);