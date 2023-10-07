// import { createContext } from 'react';
// const Context = createContext()
// export default Context

import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrganizerContextProps {
  showOrganizerSignupForm: boolean;
  setShowOrganizerSignupForm: (showOrganizerSignupForm: boolean) => void;
}

const OrganizerContext = createContext<OrganizerContextProps>({
  showOrganizerSignupForm: false,
  setShowOrganizerSignupForm: () => {},
});

interface OrganizerProviderProps {
    children: React.ReactNode;
  }

export const OrganizerProvider: React.FC<React.PropsWithChildren<OrganizerProviderProps>> = ({ children }) => {
    const [showOrganizerSignupForm, setShowOrganizerSignupForm] = useState(false);

    return (
        <OrganizerContext.Provider value={{ showOrganizerSignupForm, setShowOrganizerSignupForm }}>
          {children}
        </OrganizerContext.Provider>
    );
};

export const useOrgan = (): OrganizerContextProps => useContext(OrganizerContext);