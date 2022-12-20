import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
import Places from "../MapContainer/MapContainer";

function TripShowPage() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector((state) => Object.values(state.trips.trip));

  useEffect(() => {
    dispatch(fetchTrip(tripId));
    return () => dispatch(clearTripErrors());
  }, [dispatch]);

  return (
    <>
      <h1>{trip.name}</h1>
      <Places trip={trip} />
    </>
  );
}

export default TripShowPage;
