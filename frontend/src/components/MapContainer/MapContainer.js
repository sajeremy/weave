import React from "react";
import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import useSearchBar, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./MapContainer.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

export default function Places({ trip }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map trip={trip} />;
}

function Map({ trip }) {
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const mapRef = React.useRef();
  const setMapRef = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const changeCenter = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  const [selected, setSelected] = useState(null);
  return (
    <>
      <div>
        <SearchBar
          changeCenter={changeCenter}
          trip={trip}
          setSelected={setSelected}
        />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onLoad={setMapRef}
      >
        {selected &&
          trip.locations.map((location, i) => {
            return <Marker position={location} label={`${i + 1}`} />;
          })}
      </GoogleMap>
    </>
  );
}

const SearchBar = ({ changeCenter, trip, setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = useSearchBar();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    changeCenter({ lat, lng });
    const placeId = results[0].place_id;
    // const test = await getDetails(placeId);
    // console.log(placeId);
    // console.log(results);
    // console.log(test);
    trip.locations.push({ lat, lng });
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="search-bar"
        placeholder="search an address"
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
