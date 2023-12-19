import React from 'react';
import './CampaignItem.css';
import { Button } from 'antd';
import { format } from "date-fns";
import campaignImage from "../../assets/campaign.jpg";

interface Campaign {
  campaignID: number;
  campaignName: string;
  startDate: string;
  endDate: string;
  openHour: string;
  closeHour: string;
  description?: string | undefined;
  address: string;
  lat: number;
  long: number;
  avgrating: number;
  receiveItems: string[];
}

interface CampaignItemProps {
  campaign: Campaign;
  onViewParticipants: (campaign: Campaign) => void;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ campaign, onViewParticipants }) => {
  return (
    <div className="campaign-item">
      <img src={campaignImage} alt={campaign.campaignName} />
      <div className="campaign-details">
        <h3>{campaign.campaignName}</h3>
        <p>
          <strong>Average Rating:</strong> {campaign.avgrating}
        </p>
        <p>
          <strong>Address:</strong> {campaign.address}
        </p>
        <p>
          <strong>Time:</strong> Until {format(new Date(campaign.endDate), "dd MMM yyyy")}
        </p>
        <p>
          <strong>Working Hour:</strong> {campaign.openHour} - {campaign.closeHour} everyday
        </p>
        <p>
          <strong>Gift(s):</strong> {campaign.description ? campaign.description.split(":")[1] : ""}
        </p>
        {/* <p>
            <strong>Accepted Trash: </strong>

                  {campaign.receiveItems.map((item, index) => (
                    <Tag key={index} color="#33BBC5">
                      {item}
                    </Tag>
                  ))}

          </p> */}
        <Button style={{color:'#33bbc5'}} type='link' onClick={() => onViewParticipants(campaign)}>View Participants</Button>
      </div>
    </div>
  );
};

export default CampaignItem;