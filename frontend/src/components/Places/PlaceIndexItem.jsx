import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTrip } from "../../store/trips";
import './PlaceIndexItem.scss';

function PlaceIndexItem({ place, index }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const trip = useSelector((state) => state.trips.trip);
  
  console.log("trip", trip.locations);
  console.log("index", index);
  console.log(place);

  // const [voteCount, setVoteCount] = useState(0);
  // const handleAdd = (e) => {
  //   setVoteCount(voteCount + 1);
  //   // e.currentTarget.disabled = true;
  // };

  // const handleSubtract = (e) => {
  //   setVoteCount(voteCount - 1);
  //   // e.currentTarget.disabled = true;
  // };

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
        1
      </div>
      <div className="picture-wrapper">
        Test
      </div>
      <div className="info-wrapper">
        <div>{place.title && place.title}</div>
        <div>{place.hours && place.hours[0]}</div>
        {/* <div>{place.</div> */}
        {/* <div>
          <div>{voteCount}</div>
          <button onClick={handleAdd}>+</button>
          <button onClick={handleSubtract}>-</button>
        </div> */}
        {/* <button className="delete-button" onClick={handleDelete}> */}
          <img onClick={handleDelete} className="delete-button" src={require('../../assets/CloseModal.png')}/>
          {/* </button> */}
      </div>

      {/* <div>{startDateTime}</div>
      <div>{endDateTime}</div> */}
      
    </div>
  );
}

export default PlaceIndexItem;
