import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
 
} from "@react-google-maps/api";
import { Button, DatePicker, Input, Space } from "antd";

import { Carousel } from "antd";
import SlideCampaign from "../component/SlideCampaign/SlideCampaign";
import SearchBar from "../component/ui/SearchBar";
import CustomButton from "../component/ui/CustomButton";
const Home = () => {
  const mapStyles: React.CSSProperties = {
    height: "800px",
    width: "100%",
  };
  
   
  const slides = [
    {
      title: "Slide 1",
      description: "Description for Slide 1",
    },
    {
      title: "Slide 1",
      description: "Description for Slide 1",
    },
    {
      title: "Slide 1",
      description: "Description for Slide 1",
    },
  
  ];

  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  };
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

 

  const { RangePicker } = DatePicker;
  return (
    <LoadScript googleMapsApiKey="AIzaSyAIDQrKQhPF_BZhnoNMbcYF7T-gnbZMjPY">
      <div className="text-3xl font-bold p-4">
        <span className="text-black">WELCOME TO</span> GREENDOTS!
      </div>
      <GoogleMap
      
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        <div className = "flex flex-col align-center justify-between h-full  ">
          
          <div className=" flex justify-center items-center p-4 px-16 space-x-4 ">
          {/* <SearchBar/> */}
            <Input type="text" placeholder="Search location"></Input>
            <Space direction="vertical" size={12}>
              <RangePicker showTime />
            </Space>
            <CustomButton title= "Search"/>

          <CustomButton title = "Create a new campaign"/>
          </div>
          <div className="flex justify-center">
            <SlideCampaign slides = {slides} />
          </div>
        </div>
      </GoogleMap>
    </LoadScript>
  );
};

export default Home;


