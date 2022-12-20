import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";

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
    </>
  );
}

export default TripShowPage;
