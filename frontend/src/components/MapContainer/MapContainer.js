import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <>
      <div>
        <p> TEST IS THIS WORKING </p>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          />
        </LoadScript>
      </div>
    </>
  );
};
export default MapContainer;
