import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteTrip } from "../../store/trips";
import './TripsItem.scss';
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
    <div className="trip-item">
      <div className="trip-info-wrapper">
        <Link to={`/trips/${trip._id}`} className="Trip-Index-Item"><h2>{trip.name}</h2></Link>
        <div className="profile-date-wrapper">
          <div className="start-date"> {moment(trip.startDate).utc().format("MM-DD-YYYY")}</div>
          <span>-</span>
          <div className="end-date">{moment(trip.endDate).utc().format("MM-DD-YYYY")}</div>
        </div>
        <button className="delete-trip-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TripsItem;
