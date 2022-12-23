import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchTrip, updateTrip } from "../../store/trips";
import { fetchUser } from "../../store/users";
import "./InvitationPage.scss";

function InvitationPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const trip = useSelector((state) =>
    state.trips.trip ? state.trips.trip : {}
  );
  const owner = useSelector((state) =>
    state.users.user ? state.users.user : {}
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
    if (trip) dispatch(fetchUser(trip.owner));
  }, [dispatch]);

  return (
    <div id="Invitation-Page">
      <div>You're Invited to A Trip</div>
      {/* <div>
        {owner && owner.firstName} {owner && owner.lastName}'s Trip
      </div> */}
      <div>{trip.name}</div>
      <div> From {moment(trip.startDate).utc().format("MM-DD-YYYY")}</div>
      <div> To {moment(trip.endDate).utc().format("MM-DD-YYYY")}</div>
      <div id="invitation-buttons">
        <button id="accept" onClick={handleAccept}>
          Accept
        </button>
        <button id="decline" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
}
export default InvitationPage;
