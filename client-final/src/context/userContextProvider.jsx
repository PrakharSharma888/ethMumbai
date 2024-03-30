import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState()
  const [eoa, setEoa] = useState('')
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)

  console.log("UserContextProvider user:", user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("fetching user data");
        const response = await axios.get("http://localhost:8080/api/userData");
        console.log("fetchUserData response:", response);
        const userData = response.user; 
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const LogOut = () =>{
    setUser(null)
  }

  return(
    <UserContext.Provider value={{user, setUser, eoa, setEoa,LogOut, setSigner, signer, setProvider, provider}}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;