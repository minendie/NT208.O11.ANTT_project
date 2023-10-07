// src/Slider.tsx
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Dropdown} from "antd";
import type { MenuProps } from 'antd';
import campaignImage from "../../assets/campaign.jpg";
import CustomButton from "../ui/CustomButton";
import WhiteButton from "../ui/WhiteButton";

import Handle from "rc-slider/lib/Handles/Handle";
import DetailCampaign from "../card/CampaignCard";
import TabsPage from "../card/TabsPage/TabsPage";
import EditCampaignForm from "../form/CampaignForm/EditCampaignForm";
import { useCampaign } from "../../store/CampaignContext";
import { Link } from "react-router-dom";
interface Slide {
  title: string;
  description: string;
}

interface SliderProps {
  slides: Slide[];
}
const styles = {
  title: "text-black font-bold ",
  detail: "text-[#33BBC5] ",
};
const SlideCampaign: React.FC<SliderProps> = ({ slides }) => {
  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const campaignID=5;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const {showEditCampaignForm, setShowEditCampaignForm} = useCampaign()

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={"login"}>
          Profile
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <button 
          onClick={
            () => {
              setShowEditCampaignForm(true);
            }
          }
        >
          Edit
        </button>
      ),
      key: '1',
    },
    {
      label: (
        <Link to={"login"}>
          Contact organizer
        </Link>
      ),
      key: '2',
    },
  ];
  
  const [showCampaign, setShowCampaign] = useState(false)
  const handleClick = () =>{
    setShowCampaign(!showCampaign);
  }

  return (
    <>
    <div className="flex justify-center border-2 h-64 overflow-hidden bg-gray-200 rounded-lg shadow-md relative">
  
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full absolute top-0 left-0 transform transition-transform ease-in-out duration-300 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className=" h-full border-2 p-4 bg-white rounded-lg shadow-md flex justify-center gap-x-4">
           
              <div className="">
                <img src={campaignImage} alt="image" className="h-60" />
              </div>
              <div className = " flex flex-col h-full items-start flex-start">
                <div className="flex justify-between">
                  <div className="text-2xl text-center font-bold">
                    {" "}
                    Greenday
                  </div>
                  <div className="flex items-center">⭐ 4.6 / 5.0</div>
                </div>
                <div className={styles.title}>
                  Address:{" "}
                  <span className={styles.detail}> ki tuc xa khu A</span>{" "}
                </div>
                <div className={styles.title}>
                  Working hour:{" "}
                  <span className={styles.detail}> 5am to 9pm everyday</span>
                </div>
                <div className={styles.title}>
                  Gifts: <span className={styles.detail}> Small lotus</span>
                </div>
                <div className={styles.title}>Accepted trash</div>
                <div className="flex">
                  <CustomButton title="waste" />
                </div>
                <div className="flex justify-between flex-row align-items justify-between">
                  <CustomButton title="↳ Direction " />
                  {/* <a href="/campaign">
                  <WhiteButton title="⭐ Ratings" onClick = {handleClick} />
                  </a> */}
                  <div>
                  <WhiteButton title="⭐ Ratings" onClick = {handleClick} />
                  </div>
                  {
                    showCampaign&&<TabsPage campaignID={campaignID}/>
                  }
                  
                  
                  {/* </a> */}
                  {/* {showCampaign && <DetailCampaign organizer_name={""} address={""} start_date={""} end_date={""} open_hour={""} close_hour={""} description={""} recycling_items={[]}/>} */}
                  <Dropdown menu={{ items }} placement="bottom">
                  {/* <WhiteButton title="  ...  " /> */}
                  <Button style={{backgroundColor:'white', borderRadius:"12px" ,color:"black", padding:"4px" , margin:"4px"}}> ... </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ))}
    
      <RightCircleOutlined
        onClick={prevSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
      />
     
      <LeftCircleOutlined
        onClick={nextSlide}
        className="absolute rounded-full top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
      />
    </div>
    <EditCampaignForm 
      startDate="2023-06-09"
      endDate="2023-12-11"
      openHour="06:30:00"
      closeHour="20:00:00"
      description="We are 4 girls."
      campaignName="WhatEVER"
      address="somewhere on Earth"
      receiveItems={[]}  
    />
    </>
  );
};

export default SlideCampaign;
