import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, clearTripErrors } from "../../store/trips";
import "./TripShowPage.scss";
import Places from "../MapContainer/MapContainer";
import PlaceIndex from "../Places/PlaceIndex";
import MemberIndex from "../Members/MembersIndex";
import Modal from "../Modal/Modal";
import EditTripModal from "../EditTripModal/EditTripModal";

function TripShowPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateTrip, setUpdateTrip] = useState(false);
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );
  // debugger
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    return () => dispatch(clearTripErrors());
  }, [dispatch, tripId, updateTrip]);

  const modalFunctions = {
    tripId: tripId,
    setUpdateTrip: (shown) => setUpdateTrip(shown),
  };

  // const toEditPage = () => {
  //   history.replace(`/trips/${tripId}/edit`);
  // };

  const formatDate = (dateString) => {
    let setDate = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return setDate.toLocaleDateString("default", options);
  };

  return (
    <>
      <div className="showpage-container">
        <div className="left-info">
          <div className="top-row-info">
            <h1 className="trip-name-header">{trip.name}</h1>
            <button
              className="edit-button"
              onClick={() => setShowEditModal(true)}
            >
              <img src={require("../../assets/edit.png")} />
            </button>
          </div>
          <div className="date-container">
            <div className="start-date date-field">
              {formatDate(trip.startDate)}
            </div>
            <span className="date-seperator">-</span>
            <div className="end-date date-field">
              {formatDate(trip.endDate)}
            </div>
          </div>

          <MemberIndex trip={trip} />
          <PlaceIndex trip={trip} />
        </div>
        <div className="right-map">
          <Places trip={trip} />
        </div>
      </div>
      {showEditModal && (
        <Modal
          component={EditTripModal}
          close={(shown) => setShowEditModal(shown)}
          modalFunctions={modalFunctions}
        />
      )}
    </>
  );
}

export default TripShowPage;
