
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './CampaignItem.css'
import CampaignItem from './CampaignItem';
import Modal from './Modal'
// import DetailCampaign from "../card/CampaignCard";

interface Participant {
    userName: string;
    email?: string;
    address?: string;
    phoneNum: string;
  }
  
  interface Campaign {
    organizerName: string;
    campaignID: number;
    startDate: string;
    endDate: string;
    openHour: string;
    closeHour: string;
    description?: string;
    campaignName: string;
    address: string;
    lat: number;
    long: number;
    receiveItems: string[];
    receiveGifts: string;
  }

    
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const CampaignStatistic = () => {

    const {organizerID} = useParams();
    const [campaigns, setCampaigns] = useState<Campaign[]|null>(null);

    useEffect(() => {
        // fetch target organizer's data from the database based on their ID
        
        axios.get(`${API_ENDPOINT}/statistic-organizer/${organizerID}`, { 
            headers: {
                'ngrok-skip-browser-warning': true
            }
        })
        .then((result) => {
            const campaignList = result.data[0];
            console.log(result.data[0]);
            setCampaigns({
                ...campaignList,
            })
        })
        .catch((error) => {
            console.error(error);
        });
    })
    

    const itemsPerPage = 4; // Số lượng item hiển thị trên mỗi trang
    const totalPages = campaigns ? Math.ceil(campaigns.length / itemsPerPage) : 0; // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null); // Chi tiết chiến dịch được chọn
  
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị của Modal
    const [modalData, setModalData] = useState<Participant[] | null>(null); // Dữ liệu participants truyền vào Modal
  
    // Tính chỉ mục bắt đầu và kết thúc của các item trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Lấy danh sách campaign items cho trang hiện tại
    const currentCampaigns = campaigns ? campaigns.slice(startIndex, endIndex) : [];
  
    // Hàm xử lý khi chuyển đến trang mới
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    // Hàm xử lý khi nhấn vào nút "View Participants"
    const handleViewParticipants = (campaign: Campaign) => {
      setModalData(campaign.user);
      setSelectedCampaign(campaign);
      setShowModal(true);
    };
  
    // Hàm xử lý khi đóng danh sách người tham gia
    const handleCloseParticipants = () => {
      setShowModal(false);
      setModalData(null);
    };
  
    // Tính số lượng campaign và rating trung bình
    const numCampaigns = campaigns ? campaigns.length : 0;
    const averageRating =
      campaigns?campaigns.reduce((total, campaign) => total + campaign.rating, 0) /
      numCampaigns:0;
  
    return (
      <div className="campaign-statistic">
        <h2>Campaign Statistic</h2>
        <p><strong>No. Campaign:</strong> {numCampaigns}</p>
        <p><strong>Average rating:</strong> {averageRating.toFixed(1)}</p>
        <div className="campaign-list">
          {currentCampaigns.map((campaign) => (
            <div className="campaign-item-wrapper" key={campaign.id}>
              <CampaignItem
                campaign={campaign}
                onViewParticipants={handleViewParticipants}
              />
            </div>
          ))}
        </div>
        <div>
        {showModal && (
          <Modal isOpen={showModal} onClose={handleCloseParticipants}>
            <div className="table-container">
              <h2>{selectedCampaign?.name} Participants</h2>
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
                  {modalData?.map((participant, index) => (
                    <tr key={index}>
                      <td>{participant.userName}</td>
                      <td>{participant.email}</td>
                      <td>{participant.address}</td>
                      <td>{participant.phoneNum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal>
        )}    
        </div>
        
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
                className={pageNumber === currentPage ? 'active' : ''}
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
  };
  
  export default CampaignStatistic;