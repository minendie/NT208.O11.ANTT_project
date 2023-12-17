import React from 'react';
import './CampaignItem.css'
import { Button } from 'antd';
interface CampaignItemProps {
  campaign: Campaign;
  onViewParticipants: (campaign: Campaign) => void;
}

interface Campaign {
  name: string;
  rating: number;
  address: string;
  time: string;
  workingHour: string;
  gifts: string[];
  acceptedTrash: string[];
  image: string;
  participants?: Participant[];
}

interface Participant {
  userName: string;
  email?: string;
  address: string;
  phoneNum: string;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ campaign, onViewParticipants }) => {
  const handleViewParticipants = () => {
    onViewParticipants(campaign);
  };

  const { name, rating, address, time, workingHour, gifts, acceptedTrash, image } = campaign;

  return (
    <div className="campaign-item">
      <img src={image} alt={name} />
      <div className="campaign-details" >
        <div className="row">
          <div className="col-1">
            <div>
              <h3>{name}</h3>
            </div>
          </div>
          <div className="col-2">
            <div>
              <button className="corner-button" style={{ backgroundColor: '#4cafac', borderRadius: '50%', color:'black', height: '25px', width: '25px' }}>
                ↳ 
              </button>
            </div>
          </div>
        </div>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Working hour:</strong> {workingHour}
          </p>
          <p>
            <strong>Gift(s):</strong> {gifts.join(', ')}
          </p>
          <p>
            <strong>Accepted Trash: </strong>
            {acceptedTrash.map((trash, index) => (
              <React.Fragment key={index}>
                <span className="accepted-trash">{trash}</span>
                {index !== acceptedTrash.length - 1 && ' '}
              </React.Fragment>
            ))}
          </p>
          {campaign.participants && campaign.participants.length > 0 ? (
            <Button style={{color:'#33bbc5'}} type='link'onClick={handleViewParticipants}>View Participants</Button>
          ) : (
            <p>No participants</p>
          )}
      </div>
    </div>
  );
};

export default CampaignItem; 