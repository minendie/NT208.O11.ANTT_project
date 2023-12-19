import axios from "axios";
import { useEffect, useState } from "react";
import CampaignItem from "./CampaignItem";
import Modal from "./Modal";
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
  receiveItems: string[];
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
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/statistic-organizer/${organizer.organizerID}`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        console.log(response.data);
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
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        console.log(response.data);
        setParticipants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const itemsPerPage = 4;
  const totalPages = campaigns ? Math.ceil(campaigns.length / itemsPerPage) : 0;
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  // Tính chỉ mục bắt đầu và kết thúc của các item trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Lấy danh sách campaign items cho trang hiện tại
  const currentCampaigns = campaigns
    ? campaigns.slice(startIndex, endIndex)
    : [];

  // Hàm xử lý khi chuyển đến trang mới
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const numCampaigns = campaigns ? campaigns.length : 0;
  //const averageRating =campaigns?campaigns.reduce((total, campaign) => total + campaign.rating, 0) / numCampaigns:0;

  return (
    <div className="campaign-statistic" style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Campaign Statistic</h2>
      <p style={{ textAlign: "left", marginBottom: "10px" }}>
        <strong>No. Campaign:</strong> {numCampaigns}
      </p>
      {/* <p><strong>Average rating:</strong> {averageRating.toFixed(1)}</p> */}
      <div className="campaign-list">
        {campaigns &&
          currentCampaigns.map((campaign) => (
            <div className="campaign-item-wrapper" key={campaign.campaignID}>
              <CampaignItem
                campaign={campaign}
                onViewParticipants={handleViewParticipants}
              />
            </div>
          ))}
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="table-container">
            <h2 style={{ marginBottom: "20px" }}>
              {selectedCampaign?.campaignName} Participants
            </h2>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.username}>
                    <td>{participant.username}</td>
                    <td>{participant.email}</td>
                    <td>{participant.address}</td>
                    <td>{participant.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          &lt;&lt;
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}
