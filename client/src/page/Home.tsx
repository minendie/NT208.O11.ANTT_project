import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useAuth } from "../auth/AuthContext";
import { useOrgan } from "../contexts/OrganizerContext";
import GreenIcon from "../constant/GreenIcon";

import { DatePicker, Form, Input, Modal, Space } from "antd";
import CustomButton from "../component/ui/CustomButton";
import SlideCampaign from "../component/SlideCampaign/SlideCampaign";

import NewCampaignForm from "../component/form/CampaignForm/NewCampaignForm";
import { useCampaign } from "../contexts/CampaignContext";
import OrganizerSignupForm from "../component/form/OrganizerSignupForm/OganizerSignupForm";
import axios from "axios";
import SearchBar from "../component/ui/SearchBar";
import RedIcon from "../constant/RedIcon";
import OrangeIcon from "../constant/OrangeIcon";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

export default function Home() {
  const auth = useAuth();
  const organizer = useOrgan();
  const { campaigns, setCampaigns } = useCampaign();
  const [lat, setLat] = useState(10.8231);
  const [long, setLong] = useState(106.6297);

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
        const popup = L.popup()
          .setLatLng(e.latlng)
          .setContent("<p>You are here</p>")
          .openOn(map);
        circle.addTo(map);
        popup.addTo(map);
        // setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    return position === null ? null : (
      <div className="div">
        <Marker position={position}></Marker>
      </div>
    );
  }

  const [showComponent, setShowComponent] = useState(false);
  // const [campaigns, setCampaigns] = useState([])
  const handleInputSearch = (location) => {
    setLat(location.lat);
    setLong(location.lon);
    console.log(location.lat, location.lon);
  };
  const handleSearch = () => {
    setShowComponent(!showComponent);
    axios
      .get(`${API_ENDPOINT}/campaigns/all`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        // Assuming the response data is an array of campaigns
        setCampaigns(response.data);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error("Error fetching campaigns:", error);
      });
  };
  const { setShowNewCampaignForm } = useCampaign();
  const handleCreateCampaign = () => {
    if (organizer.organizerID) {
      setShowNewCampaignForm(true);
    } else {
      // message.warning('Only organizer can create a new campaign')
      showConfirmModal();
    }
  };
  const { RangePicker } = DatePicker;

  // Confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const showConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOk = () => {
    organizer.setShowOrganizerSignupForm(true);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };
  const dayRangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please provide the time frame for your campaign!",
      },
    ],
  };
  return (
    <>
      <div>
        <div className="text-3xl font-bold p-4">
          <span className="text-black">WELCOME TO</span> GREENDOTS!
        </div>
        <div className="">
          <MapContainer
            center={[lat, long]}
            zoom={13}
            scrollWheelZoom
            style={{ height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker />

            <div>
              <Marker position={[lat, long]}></Marker>
              <RecenterAutomatically lat={lat} lng={long} />
            </div>
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
                  <SearchBar
                    onLocationSearch={(location) => handleInputSearch(location)}
                  />

                  <Space direction="vertical" size={12}>
                    <RangePicker />
                  </Space>

                  <CustomButton title="Search" onClick={handleSearch} />

                  {auth.isLoggedIn && (
                    <CustomButton
                      title="Create a new campaign"
                      onClick={handleCreateCampaign}
                    />
                  )}
                </div>
                {showComponent && <SlideCampaign slides={campaigns} />}
                {auth.isLoggedIn && <NewCampaignForm />}
                {organizer.showOrganizerSignupForm && <OrganizerSignupForm />}
              </div>
            </div>
          </MapContainer>
        </div>
      </div>
      <Modal
        centered
        title="Do you want to register as an organizer?"
        open={isConfirmModalOpen}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        width={480}
      >
        <p>Only organizer can create a new campaign.</p>
      </Modal>
    </>
  );
}
