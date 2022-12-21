import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteTrip } from "../../store/trips";
import moment from "moment";

function TripsItem({ trip }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const current = new Date();
  // const date = `${
  //   current.getMonth() + 1
  // }/${current.getDate()}/${current.getFullYear()}`;
  // const now = moment();

  // console.log(date, trip.endDate, now.isAfter(trip.endDate));

  const handleDelete = (e) => {
    history.go(0);
    dispatch(deleteTrip(trip._id));
  };

  return (
    <>
      <Link to={`/trips/${trip._id}`} className="Trip-Index-Item">
        <h1>{trip.name}</h1>
        <div>{trip.description}</div>
        <div> {moment(trip.startDate).utc().format("MM-DD-YYYY")}</div>
        <div>{moment(trip.endDate).utc().format("MM-DD-YYYY")}</div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}

export default TripsItem;
