import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrip, clearTripErrors, updateTrip } from "../../store/trips";
import './EditTripModal.scss';

function EditTripModal({close, modalFunctions}) {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.trips);
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );
  console.log("modalfunctions", modalFunctions);
  const tripId = modalFunctions.tripId;

  const [name, setName] = useState(trip.name);
  const [startDate, setStartDate] = useState(
    moment(trip.startDate).utc().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(trip.endDate).utc().format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchTrip(tripId));
    dispatch(clearTripErrors());
  }, [dispatch, tripId]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "name":
        setState = setName;
        break;
      case "startDate":
        setState = setStartDate;
        break;
      case "endDate":
        setState = setEndDate;
        break;
      default:
        throw Error("Unknown field in Edit Trip Form");
    }
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...trip,
      name,
      startDate,
      endDate,
    };
    dispatch(updateTrip(data));
    modalFunctions.setUpdateTrip(true);
    close(false);
  };
  return (
    <>
      {trip.name && (
        // <form className="create-trip-form" onSubmit={handleSubmit}>
        // <h1>Plan a new trip</h1>
        // <div className="name-input-wrapper">
        //     <label className="name-label">Name</label>
        //     <input type="text"
        //         onChange={update("name")}   
        //         value={name}
        //         className="login-name-input">
        //     </input>
        // </div>
        <form className="edit-trip-form">
          <h1>Edit Trip Details</h1>
          <div className="name-input-wrapper">
            <label className="name-label">Name</label>
              <input type="text" className="login-name-input" onChange={update("name")} value={name}></input>
          </div>
          <div className="name-errors">{errors?.name}</div>

          <div className="date-wrapper">
          <div className="start-date-wrapper">
            <label>Start Date:</label>
              <input
                type="date"
                onChange={update("startDate")}
                value={startDate}
                min={moment().format("YYYY-MM-DD")}
                max={"2099-12-31"}
                onKeyDown={(e) => e.preventDefault()}
                className="start-date"
              ></input>
              </div>
              <div className="end-date-wrapper">
                <label>End Date:</label>
              <input
                type="date"
                onChange={update("endDate")}
                value={endDate}
                min={startDate}
                max={"2099-12-31"}
                onKeyDown={(e) => e.preventDefault()}
                className="end-date"
              ></input>
            </div>
          </div>
          <button className="update-trip-button" onClick={handleSubmit}> Update Trip</button>
        </form>
      )}
      </>
  );
}

export default EditTripModal;
