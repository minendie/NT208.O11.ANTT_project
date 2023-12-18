import axios from "axios";
import { useEffect, useState } from 'react';
import CampaignItem from './CampaignItem';
import Modal from './Modal';
import { useOrgan } from "../../contexts/OrganizerContext";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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

interface Participant {
  username: string;
  email: string;
  address: string | null;
  phoneNumber: string | null;
}

export default function CampaignStatistic() {
  const organizer = useOrgan();
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/statistic-organizer/${organizer.organizerID}`, {
        headers: {
          'ngrok-skip-browser-warning': true
        }
      })
      .then((response) => {
        console.log(response.data)
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [organizer.organizerID]);

  const handleViewParticipants = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    fetchParticipants(campaign.campaignID);
    setShowModal(true);
  };

  const fetchParticipants = (campaignID: number) => {
    axios
      .get(`${API_ENDPOINT}/participant-campaign/${campaignID}`, {
        headers: {
          'ngrok-skip-browser-warning': true
        }
      })
      .then((response) => {
        console.log(response.data)
        setParticipants(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="campaign-statistic">
      <h2>Campaign Statistic</h2>
      {campaigns && campaigns.map((campaign) => (
        <CampaignItem
          key={campaign.campaignID}
          campaign={campaign}
          onViewParticipants={handleViewParticipants}
        />
      ))}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h3>{selectedCampaign?.campaignName} Participants</h3>
          {participants.map((participant) => (
           <div key={participant.username}>
            <p>Username: {participant.username}</p>
            <p>Email: {participant.email}</p>
            <p>Address: {participant.address}</p>
            <p>Phone Number: {participant.phoneNumber}</p>
         </div>
          ))}
        </Modal>
      )}
    </div>
  );
}