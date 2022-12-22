import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
import "./TripShowPage.css";
import Places from "../MapContainer/MapContainer";
import PlaceIndex from "../Places/PlaceIndex";
import MemberIndex from "../Members/MembersIndex";

function TripShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );

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
      <MemberIndex trip={trip} />
      <Places trip={trip} />
      <PlaceIndex trip={trip} />
    </>
  );
}

export default TripShowPage;
