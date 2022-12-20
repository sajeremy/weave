import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteTrip } from "../../store/trips";

function TripsItem({ trip }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    history.go(0);
    dispatch(deleteTrip(trip._id));
  };

  return (
    <>
      <Link to={`/trips/${trip._id}`} className="Trip-Index-Item">
        <h1>{trip.name}</h1>
        <div>{trip.description}</div>
        <div>{trip.startDate}</div>
        <div>{trip.endDate}</div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}

export default TripsItem;
