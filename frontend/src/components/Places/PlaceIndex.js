import { useEffect } from "react";
import PlaceIndexItem from "./PlaceIndexItem";
import './PlaceIndex.scss';

function PlaceIndex({ trip }) {
  // const places = useSelector((state) =>
  //   state.trips.trip.locations ? state.trips.trip.locations : []
  // );
  console.log(trip.locations);

  useEffect (()=>{
    
  },[trip.locations])

  return (
    <>
      <h1 className="places-header">Places to Go</h1>

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
