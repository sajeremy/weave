import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, updateTrip } from "../../store/trips";
import "./InvitationPage.css";

function InvitationPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );

  const handleAccept = () => {
    trip.members.push(currentUser);
    const members = trip.members;
    const data = {
      ...trip,
      members,
    };
    dispatch(updateTrip(data));
    history.replace(`/trips/${tripId}`);
  };

  const handleDecline = () => {
    history.replace(`/profile`);
  };
  useEffect(() => {
    dispatch(fetchTrip(tripId));
  }, [dispatch, tripId]);

  return (
    <div id="buttons">
      <button onClick={handleAccept}>Accept </button>
      <button onClick={handleDecline}>Decline </button>
    </div>
  );
}
export default InvitationPage;
