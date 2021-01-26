import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function Home() {
  const init = [{ title: "" }];
  const [hotelID, setHotelID] = useState("4042");
  const [hotelInfo, setHotelInfo] = useState(init);
  const [selectedHotel, setSelectedHotel] = useState({
    id: "",
    title: "",
    content: "",
    address: "",
    phone: "",
    price: "",
    directions: "",
    email: "",
    url: "",
    geo: [""],
  });

  const fetchData = () => {
    apiFacade.getHotels().then((data) => setHotelInfo(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = hotelInfo.map((item) => {
    return {
      value: item.id,
      label: item.title,
    };
  });

  const fetchHotelByID = (id) => {
    apiFacade.getHotelByID(id).then((data) => setSelectedHotel(data));
  };

  const onChange = (evt) => {
    setHotelID(evt.value);
    console.log(selectedHotel);
    console.log(hotelID);
  };

  useEffect(() => {
    fetchHotelByID(hotelID);
  }, [hotelID]);

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Hotel list</h2>
          <h3>Search for hotels</h3>
          <Select
            options={options}
            isSearchable
            placeholder="Search for hotel"
            onChange={onChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Email </th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedHotel.id}>
                <td>{selectedHotel.title}</td>
                <td>{selectedHotel.address}</td>
                <td>{selectedHotel.phone}</td>
                <td>{selectedHotel.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
