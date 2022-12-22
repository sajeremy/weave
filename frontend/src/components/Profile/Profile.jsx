import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTrips, clearTripErrors, deleteTrip } from "../../store/trips";
import TripsItem from "../Trips/TripsItem";
import './Profile.scss';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userTrips = useSelector((state) =>
    state.trips.trips ? Object.values(state.trips.trips) : []
  );
  // console.log("testing", userTrips); commented out for render

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
    <div className="trips-page-container">
      {/* {userTrips.map((trip) => (
        <>
          <TripsItem key={trip._id} trip={trip} />
        </>
      ))} */}
      <div className="trips-container">
        <h1>Current Trips</h1>
        {userTrips &&
          userTrips
            .filter((trip) => now.isBefore(trip.endDate))
            .map((filteredTrip) => (
              <>
                <TripsItem key={filteredTrip._id} trip={filteredTrip} />
              </>
            ))}
        <h1>Past Trips</h1>
        {userTrips &&
          userTrips
            .filter((trip) => now.isAfter(trip.endDate))
            .map((filteredTrips) => (
              <TripsItem key={filteredTrips._id} trip={filteredTrips} />
            ))}
      </div>
      <div id="ProfilePage-user-info">
        <div>{currentUser.firstName}</div>
        <div>{currentUser.lastName}</div>
        <div>{currentUser.email}</div>
        {/* <button>Edit Profile </button> */}
      </div>
    </div>
  );
}

export default Profile;
