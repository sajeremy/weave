import { Link } from "react-router-dom";

function TripsItem({ trip }) {
  
  return (
    <>
      <Link to={`/trips/${trip._id}`} className="Trip-Index-Item">
        <h1>{trip.name}</h1>
        <div>{trip.description}</div>
        <div>{trip.startDate}</div>
        <div>{trip.endDate}</div>
      </Link>
    </>
  );
}

export default TripsItem;
