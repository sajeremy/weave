import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTrips, clearTripErrors, deleteTrip } from "../../store/trips";
import TripsItem from "../Trips/TripsItem";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userTrips = useSelector((state) =>
    state.trips.trips ? Object.values(state.trips.trips) : []
  );

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    return () => dispatch(clearTripErrors());
  }, []);

  // if (userTrips.length === 0) {
  //   return (
  //     <>
  //         <div>You have no upcoming trips, start planning?</div>
  //         <button>Create New Trip</button>
  //     </>
  //      )
  // } else {

  return (
    <>
      <div id="ProfilePage-user-info">
        <div>{currentUser.firstName}</div>
        <div>{currentUser.email}</div>
        <button>Edit Profile </button>
      </div>
      {userTrips.map((trip) => (
        <>
          <TripsItem key={trip._id} trip={trip} />
          {/* <button onClick={dispatch(deleteTrip(trip._id))}>Delete</button> */}
        </>
      ))}
      <div>Current Trips</div>
      {/* {userTrips.filter((trip) => {
        if (date < trip.endDate)
          return <TripsItem key={trip._id} trip={trip} />;
      })} */}

      <div>Past Trips</div>
      {/* {userTrips.filter((trip) => {
        if (date > trip.endDate)
          return <TripsItem key={trip._id} trip={trip} />;
      })} */}
    </>
  );
}

export default Profile;
