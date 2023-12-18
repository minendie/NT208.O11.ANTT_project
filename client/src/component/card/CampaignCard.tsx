import { Space, Tag } from "antd";
import FollowButton from "../ui/FollowButton";
import React from "react";
// import { AlignCenterOutlined } from "@ant-design/icons";
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
const styles = {
  title: "text-[#33BBC5] font-bold",
  detail: "text-black font-normal",
  tag: "text-white font-normal",
};

const DetailCampaign: React.FC<{
  campaign: Campaign;
  isFollow: boolean;
  userID: string | null;
}> = ({ campaign, isFollow, userID }) => {
  const start_date = campaign.startDate.split("T")[0].toString();
  const end_date = campaign.endDate.split("T")[0].toString();

  return (
    <>
      <div className=" flex flex-col h-full items-start flex-start p-12 pb-5 gap-2.5 margin">
        <div className="text-2xl text-center font-bold text-[#33BBC5] ">
          {" "}
          {campaign.campaignName}
        </div>
        <div className={styles.title}>
          Organizer:{"   "}
          <span className={styles.detail}> {campaign.organizerName}</span>{" "}
        </div>
        <div className={styles.title}>
          Address: <span className={styles.detail}> {campaign.address}</span>{" "}
        </div>
        <div className={styles.title}>
          Date:{" "}
          <span className={styles.detail}>
            {" "}
            {start_date} {" to "} {end_date}{" "}
          </span>
        </div>
        <div className={styles.title}>
          Working hour:{" "}
          <span className={styles.detail}>
            {" "}
            {campaign.openHour} {"-"} {campaign.closeHour}{" "}
          </span>
        </div>
        <div className={styles.title}>
          Gift(s) for trade:{" "}
          <span className={styles.detail}> {campaign.receiveGifts} </span>
        </div>
        <div className={styles.title}>
          Accepted trash:{"   "}
          {campaign.receiveItems.map((item, index) => (
            <span key={index} className={styles.tag}>
              <Space size={[0, 8]} wrap>
                <Tag color="#33BBC5">{item}</Tag>
              </Space>
            </span>
          ))}
        </div>
        <div className={styles.title}>
          Description:{" "}
          <span className={styles.detail}> {campaign.description}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userID && (
          <FollowButton
            campaignID={campaign.campaignID}
            userID={userID}
            isFollow={isFollow}
          />
        )}
      </div>
    </>
  );
};

export default DetailCampaign;
