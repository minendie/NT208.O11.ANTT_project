import React, { createContext, useContext, useState, useEffect } from 'react';

interface MapItemsContextProps {
  newCampaignPosition: [any, any];
  setNewCampaignPosition: (showNewCampaignForm: [any, any]) => void;
}

const MapItemsContext = createContext<MapItemsContextProps>({
  newCampaignPosition: [undefined, undefined],
  setNewCampaignPosition: () => {},
});

interface MapItemsProviderProps {
    children: React.ReactNode;
  }

export const MapItemsProvider: React.FC<React.PropsWithChildren<MapItemsProviderProps>> = ({ children }) => {
    const [newCampaignPosition, setNewCampaignPosition] = useState<[any, any]>([undefined, undefined]);

    return (
        <MapItemsContext.Provider value={{ newCampaignPosition, setNewCampaignPosition }}>
          {children}
        </MapItemsContext.Provider>
    );
};

export const useCampaign = (): MapItemsContextProps => useContext(MapItemsContext);