import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTrip } from "../../store/trips";

function PlaceIndexItem({ place, index }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const trip = useSelector((state) => state.trips.trip);

  const [voteCount, setVoteCount] = useState(0);
  const handleAdd = (e) => {
    setVoteCount(voteCount + 1);
    // e.currentTarget.disabled = true;
  };

  const handleSubtract = (e) => {
    setVoteCount(voteCount - 1);
    // e.currentTarget.disabled = true;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    trip.locations.splice(index, 1);
    dispatch(updateTrip(trip));
    history.go(0);
    // this.setstate
  };

  return (
    <>
      <div>{place.title}</div>

      {/* <div>{startDateTime}</div>
      <div>{endDateTime}</div> */}
      <div>
        <div>{voteCount}</div>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleSubtract}>-</button>
      </div>
      <button onClick={handleDelete}>Delete Place</button>
    </>
  );
}

export default PlaceIndexItem;
