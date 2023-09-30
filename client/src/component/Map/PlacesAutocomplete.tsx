// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import { Button } from 'antd';

// const Home = () => {
//   const mapStyles: React.CSSProperties = {
//   height: '800px',
//     width: '100%',
//   };

//   const defaultCenter = {
//     lat: 37.7749,
//     lng: -122.4194,
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAIDQrKQhPF_BZhnoNMbcYF7T-gnbZMjPY">
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={13}
//         center={defaultCenter}
//       >
//         {/* Add map components here */}
//         <Button>aaa</Button>
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Home;

import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface Place {
  lat: number;
  lng: number;
}

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAIDQrKQhPF_BZhnoNMbcYF7T-gnbZMjPY",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState<Place | null>(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

interface PlacesAutocompleteProps {
  setSelected: (place: Place | null) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
