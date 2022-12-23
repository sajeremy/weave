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

  return (
    <div className="place-container">
      <div className="marker-number">
        {index+1}
      </div>
      <div className="picture-wrapper">
        <img className="place-photo" src={place.photo}/>
      </div>
      <div className="info-wrapper">
        { place.website && <a className="website-link" href={place.website} target="_blank"> 
          <div>{place.title && place.title}</div>
        </a> }
          { place.rating  && <div className="place-rating">Rating: { place.rating } stars</div> }
          { place.hours && <div>Hours:  { place.hours[4]}</div> }
        
      
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
