import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  username?: string | null;
  userID?: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  username: '',
  userID: 0,
  logout: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<React.PropsWithChildren<AuthProviderProps>> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userID, setUserID] = useState(localStorage.getItem('userID'));

    const logout = () => {
      setLoggedIn(false);
      localStorage.clear();
    }
    
    useEffect(() => {
        // Check for a valid JWT token in local storage
        const expireTime = localStorage.getItem('exp');
        if (expireTime && (Date.now() / 1000 < parseInt(expireTime))) {
          setLoggedIn(true);
          const currUsername = localStorage.getItem('username');
          setUsername(currUsername);
          var currUserID: any = localStorage.getItem('userID');
          currUserID = parseInt(String(userID));
          console.log(userID)
          setUserID(currUserID)
        } else {
          logout()
        }
      }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, username, userID, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);