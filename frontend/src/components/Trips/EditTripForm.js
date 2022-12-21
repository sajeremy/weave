import { useEffect, useState } from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrip, clearTripErrors, updateTrip } from "../../store/trips";

function EditTripForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );
  console.log(trip.name);

  const [name, setName] = useState(trip.name);
  const [startDate, setStartDate] = useState(
    moment(trip.startDate).utc().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(trip.endDate).utc().format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchTrip(tripId));
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

    history.replace(`/trips/${tripId}`);
  };
  return (
    <>
      <h1>Edit Trip Details</h1>
      {trip.name && (
        <form>
          <label>
            Name
            <input type="text" onChange={update("name")} value={name}></input>
          </label>

          <label>
            Start Date:
            <input
              type="date"
              onChange={update("startDate")}
              value={startDate}
            ></input>
          </label>

          <label>
            End Date:
            <input
              type="date"
              onChange={update("endDate")}
              value={endDate}
            ></input>
          </label>
          <button onClick={handleSubmit}> Update Trip</button>
        </form>
      )}
    </>
  );
}

export default EditTripForm;
