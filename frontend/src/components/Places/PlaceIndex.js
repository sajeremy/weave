import { useEffect } from "react";
import { useSelector } from "react-redux";
import PlaceIndexItem from "./PlaceIndexItem";

function PlaceIndex({ trip }) {
  // const places = useSelector((state) =>
  //   state.trips.trip.locations ? state.trips.trip.locations : []
  // );
  console.log(trip.locations);

  useEffect (()=>{
    
  },[trip.locations])

  return (
    <>
      <div>Places to Go</div>

      {trip.locations &&
        trip.locations.map((place, index) => (
          <>
            <div></div>
            <PlaceIndexItem key={place._id} place={place} index={index} />
          </>
        ))}
    </>
  );
}

export default PlaceIndex;
