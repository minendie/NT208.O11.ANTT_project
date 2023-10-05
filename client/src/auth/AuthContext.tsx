import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<React.PropsWithChildren<AuthProviderProps>> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check for a valid JWT token in local storage
        const expireTime = localStorage.getItem('exp');
        if (expireTime && (Date.now() / 1000 < parseInt(expireTime))) {
          setLoggedIn(true);
          console.log('is not expire ', Date.now() / 1000) 
        } else {
          setLoggedIn(false);
          localStorage.clear()
        }
      }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);