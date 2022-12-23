import React from "react";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateTrip } from "../../store/trips";
import "@reach/combobox/styles.css";
import mapStyles from "./MapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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

export default function Places({ trip }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map trip={trip} />;
}

function Map({ trip }) {
  // console.log("test", trip);
  let center;

  if (trip && trip.locations?.length) {
    center = trip.locations[trip.locations.length - 1]?.coordinates;
  } else {
    center = { lat: 40.7128, lng: -74.006 };
  }
  console.log("center", center);

  // const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    clickableIcons: false,
  };
  const mapRef = React.useRef();
  const setMapRef = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const changeCenter = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selected, setSelected] = useState(null);
  return (
    <div className="map">
      <div className="damjustin">
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
        options={options}
      >
        {trip.locations &&
          trip.locations.map((location, i) => {
            return (
              <Marker
                key={location.title}
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
                onClick={() => {
                  setSelectedMarker(location);
                }}
              />
            );
          })}
        {selectedMarker ? (
          <InfoWindow
            position={selectedMarker.coordinates}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div className="infowindow-container">
              <div>
                <h1 className="infowindow-title">{selectedMarker.title}</h1>
                <p className="infowindow-rating">
                  Rating: {selectedMarker.rating}
                </p>
                <img
                  className="infowindow-img"
                  src={selectedMarker.photo}
                  alt="No Photos Available"
                ></img>
                {selectedMarker.hours && (
                  <ul>
                    {selectedMarker.hours.map((dayHours) => {
                      return <li>{dayHours}</li>;
                    })}
                  </ul>
                )}
              </div>
              <a href={selectedMarker.website}>Click for more info</a>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

const SearchBar = ({ changeCenter, trip, setSelected }) => {
  const dispatch = useDispatch();
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
      fields: ["name", "opening_hours", "website", "rating", "photos"],
    };
    const details = await getDetails(request);
    console.log(details);
    if (details.opening_hours) {
      trip.locations.push({
        title: details.name,
        coordinates: { lat, lng },
        hours: details.opening_hours.weekday_text,
        rating: details.rating,
        website: details.website,
        photo: details.photos[0].getUrl(),
      });
    } else {
      trip.locations.push({
        title: details.name,
        coordinates: { lat, lng },
        rating: details.rating,
        website: details.website,
        photo: details.photos[0].getUrl(),
      });
    }
    console.log(trip);
    setSelected({ lat, lng });
  };

  const handleSaveLocations = (e) => {
    e.preventDefault();
    dispatch(updateTrip(trip));
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
      <button onClick={handleSaveLocations}>Save</button>
    </Combobox>
  );
};
