import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTrip } from "../../store/trips";
import './PlaceIndexItem.scss';

function PlaceIndexItem({ place, index }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const trip = useSelector((state) => state.trips.trip);

  const handleDelete = (e) => {
    e.preventDefault();
    trip.locations.splice(index, 1);
    dispatch(updateTrip(trip));
    history.go(0);
    // this.setstate
  };
  console.log(place.hours);
  return (
    <div className="place-container">
      <div className="marker-number">
        1
      </div>
      <div className="picture-wrapper">
        Test
      </div>
      <div className="info-wrapper">
        <a href={place.website}>
          <div>{place.title}</div>
          <div>Rating: {place.rating} stars</div>
          <div>Hours: {place.hours && place.hours[0]}</div>
        </a>
      
      {/* <div>{startDateTime}</div>
      <div>{endDateTime}</div> */}
      {/* <div>
        <div>{voteCount}</div>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleSubtract}>-</button>
      </div> */}
      <img onClick={handleDelete} className="delete-button" src={require('../../assets/CloseModal.png')}/>
    </div>
    </div>
  );
}

export default PlaceIndexItem;
