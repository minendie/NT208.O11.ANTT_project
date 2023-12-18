import React from 'react';
import './CampaignItem.css';
import { Button } from 'antd';

interface Campaign {
  campaignID: number;
  campaignName: string;
  startDate: string;
  endDate: string;
  openHour: string;
  closeHour: string;
  description?: string;
  address: string;
  lat: number;
  long: number;
  avgrating: number;
}

interface CampaignItemProps {
  campaign: Campaign;
  onViewParticipants: (campaign: Campaign) => void;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ campaign, onViewParticipants }) => {
  return (
    <div className="campaign-item">
      <div className="campaign-details">
        <h3>{campaign.campaignName}</h3>
        <p>
          <strong>Start Date:</strong> {campaign.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {campaign.endDate}
        </p>
        <p>
          <strong>Open Hour:</strong> {campaign.openHour}
        </p>
        <p>
          <strong>Close Hour:</strong> {campaign.closeHour}
        </p>
        <p>
          <strong>Address:</strong> {campaign.address}
        </p>
        <p>
          <strong>Average Rating:</strong> {campaign.avgrating}
        </p>
        <Button type='link' onClick={() => onViewParticipants(campaign)}>View Participants</Button>
      </div>
    </div>
  );
};

export default CampaignItem;