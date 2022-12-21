import { useEffect } from "react";
import moment from "moment";
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
  const now = moment();

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
        {/* <button>Edit Profile </button> */}
      </div>

      {/* {userTrips.map((trip) => (
        <>
          <TripsItem key={trip._id} trip={trip} />
        </>
      ))} */}

      <div>Current Trips</div>
      {userTrips &&
        userTrips
          .filter((trip) => now.isBefore(trip.endDate))
          .map((filteredTrip) => (
            <>
              <TripsItem key={filteredTrip._id} trip={filteredTrip} />
            </>
          ))}
      <div>Past Trips</div>
      {userTrips &&
        userTrips
          .filter((trip) => now.isAfter(trip.endDate))
          .map((filteredTrips) => (
            <TripsItem key={filteredTrips._id} trip={filteredTrips} />
          ))}
    </>
  );
}

export default Profile;
