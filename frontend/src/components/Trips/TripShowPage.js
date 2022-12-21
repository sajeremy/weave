import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
import Places from "../MapContainer/MapContainer";

function TripShowPage() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );
  // console.log(trip);
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    return () => dispatch(clearTripErrors());
  }, [dispatch, tripId]);

  return (
    <>
      <h1>{trip.name}</h1>
      <div>{trip.description}</div>
      <div>{trip.startDate}</div>
      <div>{trip.endDate}</div>
      <Places trip={trip} />
    </>
  );
}

export default TripShowPage;
