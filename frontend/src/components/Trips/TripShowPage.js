import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
// import PlaceIndex from "../Places/PlaceIndex";
import "./TripShowPage.css";
import Places from "../MapContainer/MapContainer";

function TripShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );

  console.log("tsting", trip);
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    return () => dispatch(clearTripErrors());
  }, [dispatch, tripId]);

  const toEditPage = () => {
    history.replace(`/trips/${tripId}/edit`);
  };
  return (
    <>
      <h1>{trip.name}</h1>
      <div>{trip.description}</div>
      <div>{moment(trip.startDate).utc().format("MM-DD-YYYY")}</div>
      <div>{moment(trip.endDate).utc().format("MM-DD-YYYY")}</div>
      <button onClick={toEditPage}>Edit Trip</button>
      <Places trip={trip} />
   
    </>
  );
}

export default TripShowPage;
