import React, { createContext, useContext, useState, useEffect } from 'react';

interface CampaignContextProps {
  showNewCampaignForm: boolean;
  setShowNewCampaignForm: (showNewCampaignForm: boolean) => void;
  showEditCampaignForm: boolean;
  setShowEditCampaignForm: (showEditCampaignForm: boolean) => void;
  showCampaignDetail: boolean;
  setShowCampaignDetail: (showCampaignDetail: boolean) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
  showNewCampaignForm: false,
  setShowNewCampaignForm: () => {},
  showEditCampaignForm: false,
  setShowEditCampaignForm: () => {},
  showCampaignDetail: false,
  setShowCampaignDetail: () => {},
});

interface CampaignProviderProps {
    children: React.ReactNode;
  }

export const CampaignProvider: React.FC<React.PropsWithChildren<CampaignProviderProps>> = ({ children }) => {
    const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
    const [showEditCampaignForm, setShowEditCampaignForm] = useState(false);
    const [showCampaignDetail, setShowCampaignDetail] = useState(false);

    return (
        <CampaignContext.Provider value={{ showNewCampaignForm, setShowNewCampaignForm, showEditCampaignForm, setShowEditCampaignForm, showCampaignDetail, setShowCampaignDetail }}>
          {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = (): CampaignContextProps => useContext(CampaignContext);