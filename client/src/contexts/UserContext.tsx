import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the user context
export const UserContext = createContext<any>(null);

// Create a provider component for the user context
export const UserProvider = ({ children } : any) => {

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
        setLoggedIn(false);
        return;
    };

    axios.get('http://localhost:6969/api/user', {
        headers: {
            token: token
        }
    }).then((res : any) => {

        const user = res.data;
        setUser(user);

    }).catch((error : any) => {
        setLoggedIn(false);
        console.log(error.message);
    });

  }, []);

  return (
    <UserContext.Provider value={{ user, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};