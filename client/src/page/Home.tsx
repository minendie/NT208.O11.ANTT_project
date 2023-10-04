import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "../constant/constants";
import { DatePicker, Input, Rate, Space } from "antd";
import CustomButton from "../component/ui/CustomButton";
import SlideCampaign from "../component/SlideCampaign/SlideCampaign";
import Search from "react-leaflet-search"
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

export default function Home() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    
    const map = useMap();
    
  
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <div className="div">
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br />
            Map bbox: <br />
            <b>Southwest lng</b>: {bbox[0]} <br />
            <b>Southwest lat</b>: {bbox[1]} <br />
            <b>Northeast lng</b>: {bbox[2]} <br />
            <b>Northeast lat</b>: {bbox[3]}
          </Popup>
        </Marker>
      </div>
    );
  }
  const [showComponent, setShowComponent] = useState(false)
  const handleSearch = () => {
    setShowComponent(!showComponent)
    }
  const { RangePicker } = DatePicker;
  return (
    <div>
      <div className="text-3xl font-bold p-4">
        <span className="text-black">WELCOME TO</span> GREENDOTS!
      </div>
      <div className="">
        <MapContainer
          center={[49.1951, 16.6068]}
          zoom={13}
          scrollWheelZoom
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 1000,
              width: "100%",
              height: "100%",
            }}
          >
            <div className="flex flex-col align-center justify-between h-full">
              <div className=" flex justify-center items-center p-4 space-x-4 w-full">
                {/* <SearchBar/> */}
                <Input
                  style={{ width: "20%" }}
                  type="text"
                  placeholder="Search location"
                ></Input>
                
                <Space direction="vertical" size={12}>
                  <RangePicker showTime />
                </Space>
                <CustomButton title="Search" onClick= {handleSearch} />

                <CustomButton title="Create a new campaign" onClick = {handleSearch}/>
              </div>
                {showComponent&&<SlideCampaign slides={slides}/>}
            </div>
          </div>
        </MapContainer>

       
      </div>
    </div>
  );
}
