import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTrip } from "../../store/trips";

function MemberIndexItem({ member, index }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const trip = useSelector((state) => state.trips.trip);
  const currentUserId = useSelector((state) => state.session.user._id);

  const handleDelete = (e) => {
    e.preventDefault();
    trip.members.splice(index, 1);
    dispatch(updateTrip(trip));
    history.go(0);
  };

  return (
    <>
      <div>{member.firstName}</div>
      <div>{member.lastName}</div>
      {/* { if(trip.owner === currentUserId)  */}
      <button onClick={handleDelete}>Remove </button>
      {/* } */}
    </>
  );
}
export default MemberIndexItem;
