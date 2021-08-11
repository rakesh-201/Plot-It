import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

const Map = () => {
  const data = useSelector((state) => state.data);
  // console.log("in")
  // console.log(data[0]["__rownum__"]);

  return (
    <MapContainer center={[19.076, 72.8777]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
