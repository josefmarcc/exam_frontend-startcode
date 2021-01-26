import React, { useState, useEffect } from "react";
import apiFacade from "../api/apiFacade";
import SERVER_URL from "../util/Settings";
import Select from "react-select";

export default function Booking({ isLoggedIn }) {
  const [hotels, setHotels] = useState([]);
  const [options, setOptions] = useState([
    { value: 1, label: "Apples", address: "" },
  ]);
  const [selectedOption, setSelectedOption] = useState({
    value: 4042,
    label: "Apples",
  });
  const [singleHotel, setSingleHotel] = useState({ value: 4042 });

  const fetchHotels = () => {
    return fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
        console.log("1. fetch" + hotels);
      });
  };

  // henter data fra API, og sætter Options.
  useEffect(() => {
    fetchHotels();
  }, []);

  // setOptions efter hotels er renderet.
  useEffect(() => {
    setOptions(mappedItems);
    console.log("Mapped til options" + hotels);
  }, [hotels]);

  // Konverter items til options.
  const mappedItems = hotels.map((hotel) => {
    return { value: hotel.id, label: hotel.title };
  });
  console.log(mappedItems);

  const handleChange = (newOption) => {
    setSelectedOption({ newOption });
    setSingleHotel(hotelFilter(hotels));
    console.log("Single: " + singleHotel);
    console.log("Option selected", selectedOption);
  };

  const hotelFilter = (hotels) => {
    return hotels
      .filter((hotel) => hotel.id === selectedOption.value)
      .map((filteredHotel) => filteredHotel.title);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Api Calls(On load)</h2>
          <Select options={options} onChange={handleChange} isSearchable />
          <h2 className="text-center mt-5 mb-2">Hotel info</h2>
          <div>
            <p>Her</p>
            <p>{singleHotel.title}</p>
          </div>
          {isLoggedIn && (
            <div className="mt-5">
              <p>*******************</p>
              <h4>Only visable if logged in</h4>
              <p>Add custom features for users</p>
              <p>*******************</p>
            </div>
          )}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
