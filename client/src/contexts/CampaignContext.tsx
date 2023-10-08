import React, { createContext, useContext, useState, useEffect } from 'react';


interface CampaignProps {
  campaignName: string,
  receiveItems: string[],
  organizerName: string,
  address: string,
  openHour: string,
  closeHour: string,
  startDate: string,
  endDate: string,
  receiveGifts: string,
  organizerID: number,
  campaignID: number,
  lat: number,
  long: number,
  averageRating: number,
}

interface CampaignContextProps {
  showNewCampaignForm: boolean;
  setShowNewCampaignForm: (showNewCampaignForm: boolean) => void;
  showEditCampaignForm: boolean;
  setShowEditCampaignForm: (showNewCampaignForm: boolean) => void;
  campaigns: CampaignProps[];
  setCampaigns: (campaigns: CampaignProps[]) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
  showNewCampaignForm: false,
  setShowNewCampaignForm: () => {},
  showEditCampaignForm: false,
  setShowEditCampaignForm: () => {},
  campaigns: [],
  setCampaigns: () => {},
});

interface CampaignProviderProps {
    children: React.ReactNode;
  }

export const CampaignProvider: React.FC<React.PropsWithChildren<CampaignProviderProps>> = ({ children }) => {
    const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
    const [showEditCampaignForm, setShowEditCampaignForm] = useState(false);
    const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);

    return (
        <CampaignContext.Provider value={{ showNewCampaignForm,   
                                            setShowNewCampaignForm, 
                                            showEditCampaignForm, 
                                            setShowEditCampaignForm,
                                            campaigns,
                                            setCampaigns }}>
          {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = (): CampaignContextProps => useContext(CampaignContext);