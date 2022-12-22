import { useSelector } from "react-redux";
import PlaceIndexItem from "./PlaceIndexItem";

function PlaceIndex() {
  const places = useSelector((state) => state.trips.trip.locations);

  return (
    <>
      {places.map((place) => {
        <PlaceIndexItem key={place._id} place={place} />;
      })}
    </>
  );
}

export default PlaceIndex;
