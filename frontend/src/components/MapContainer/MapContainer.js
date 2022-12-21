import React from "react";
import { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  infoWindow,
} from "@react-google-maps/api";
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
            return (
              <Marker
                key={location.name}
                position={location.coordinates}
                label={{
                  text: `${i + 1}`,
                  color: "white",
                  fontWeight: "bold",
                }}
                icon={{
                  path: `
              M 1,0
              L 2,0
              A 1 1 0 0 1 3,1
              A 1 1 0 0 1 2,2
              L 1,2
              A 1 1 0 0 1 0,1
              A 1 1 0 0 1 1,0
              z
            `,
                  fillOpacity: 1,
                  fillColor: "#235251",
                  strokeColor: "black",
                  strokeWeight: 1,
                  scale: 15,
                  labelOrigin: new window.google.maps.Point(1.5, 1),
                  anchor: new window.google.maps.Point(1.5, 1),
                }}
              />
            );
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
    const request = {
      placeId: placeId,
      fields: ["name", "opening_hours", "website", "rating"],
    };
    const details = await getDetails(request);
    trip.locations.push({
      name: details.name,
      coordinates: { lat, lng },
      hours: details.opening_hours,
      rating: details.rating,
      website: details.website,
    });
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
