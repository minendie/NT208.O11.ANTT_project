import React, { useState } from "react";
import { Modal, Tabs } from "antd";
import DetailCampaign from "../CampaignCard";
import ReviewPage from "../../Review/Review_page";
import "./Tabs.css";

interface Campaign {
  organizerName: string;
  campaignID: number;
  organizerID: number;
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

const TabsPage: React.FC<{
  campaign: Campaign;
  setShowCampaignIndex: (idx: number) => void;
  isFollow: boolean;
  userID: string | null;
}> = ({ campaign, setShowCampaignIndex, isFollow, userID }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleCancel = () => {
    setShowCampaignIndex(-1);
    setIsModalOpen(false);
  };

  const Page = [
    {
      label: "Detail",
      component: (
        <DetailCampaign
          campaign={campaign}
          userID={userID}
          isFollow={isFollow}
        />
      ),
    },
    {
      label: "Review",
      component: <ReviewPage campaignID={campaign.campaignID}></ReviewPage>,
    },
  ];

  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        width="60vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={Page.map((_, i) => {
            const id = String(i + 1);
            return {
              label: _.label,
              key: id,
              children: _.component,
            };
          })}
        />
      </Modal>
    </>
  );
};

export default TabsPage;
