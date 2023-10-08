import React, { createContext, useContext, useState, useEffect } from 'react';

interface CampaignContextProps {
  showNewCampaignForm: boolean;
  setShowNewCampaignForm: (showNewCampaignForm: boolean) => void;
  showEditCampaignForm: boolean;
  setShowEditCampaignForm: (showNewCampaignForm: boolean) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
  showNewCampaignForm: false,
  setShowNewCampaignForm: () => {},
  showEditCampaignForm: false,
  setShowEditCampaignForm: () => {},
});

interface CampaignProviderProps {
    children: React.ReactNode;
  }

export const CampaignProvider: React.FC<React.PropsWithChildren<CampaignProviderProps>> = ({ children }) => {
    const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
    const [showEditCampaignForm, setShowEditCampaignForm] = useState(false);

    return (
        <CampaignContext.Provider value={{ showNewCampaignForm, setShowNewCampaignForm, showEditCampaignForm, setShowEditCampaignForm }}>
          {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = (): CampaignContextProps => useContext(CampaignContext);