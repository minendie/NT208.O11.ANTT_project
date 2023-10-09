import React, { useState } from "react";
import axios from "axios";
import { AutoComplete } from "antd";
import debounce from "lodash/debounce";

const LIMIT = 25;
const DEBOUNCE_TIME = 800;

const SearchBar = ({ onLocationSearch }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    const newQuery = value;
    if (newQuery) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            newQuery
          )}&format=json&limit=${LIMIT}&countrycodes=VN`
        )
        .then((response) => {
          const convertData = response.data.map((item) => ({
            label: item.display_name,
            value: item.display_name,
            extra: {
              lat: item.lat,
              lon: item.lon
            }
          }));
          console.log("aa",convertData);
          setSuggestions(convertData);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  return (
    <AutoComplete
      style={{ width: "50%" }}
      onSearch={debounce(handleSearch, DEBOUNCE_TIME)}
      onSelect={(value, option) => {
        const { extra } = option;
        onLocationSearch({
          display_name: value,
          lat: extra.lat ? parseFloat(extra.lat) : undefined,
          lon: extra.lon ? parseFloat(extra.lon) : undefined,

        });

      }
    
    }
      placeholder="Search your place..."
      options={suggestions}
      allowClear
    />
  );
};

export default SearchBar;
