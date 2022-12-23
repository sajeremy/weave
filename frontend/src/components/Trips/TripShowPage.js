import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
import "./TripShowPage.scss";
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
  // debugger
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    return () => dispatch(clearTripErrors());
  }, [dispatch, tripId]);

  const toEditPage = () => {
    history.replace(`/trips/${tripId}/edit`);
  };

  const formatDate = (dateString) => {
    dateString = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return dateString.toLocaleDateString('default', options)
  }

  return (
    <div className="showpage-container">
      <div className="left-info">
        <div className="top-row-info">
          <h1 className="trip-name-header">{trip.name}</h1>
          <button className="edit-button" onClick={toEditPage}><img src={require('../../assets/edit.png')}/></button>
        </div>
        <div className="date-container">
          <div className="start-date date-field">{formatDate(trip.startDate)}</div>
          <span className="date-seperator">-</span>
          <div className="end-date date-field">{formatDate(trip.startDate)}</div>
        </div>
        
        <MemberIndex trip={trip} />
        <PlaceIndex trip={trip} />
      </div>
      <div className="right-map">
        <Places trip={trip} />
      </div>
    </div>
  );
}

export default TripShowPage;
