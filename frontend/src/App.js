import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import Profile from "./components/Profile/Profile";
import NewTripForm from "./components/Trips/NewTripForm";
import Places from "./components/MapContainer/MapContainer";
import AboutPage from "./components/About/About";

import { getCurrentUser } from "./store/session";
import TripShowPage from "./components/Trips/TripShowPage";
import EditTripForm from "./components/Trips/EditTripForm";
import InvitationPage from "./components/Invite/InvitationPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />

          <ProtectedRoute exact path="/profile" component={Profile} />
          {/* <ProtectedRoute exact path="/bonnie" component={Places} /> */}
          <AuthRoute exact path="/about" component={AboutPage} />
          <ProtectedRoute exact path="/trips/new" component={NewTripForm} />
          <ProtectedRoute
            exact
            path="/trips/:tripId/edit"
            component={EditTripForm}
          />
          <AuthRoute
            exact
            path="/trips/:tripId/invite"
            component={InvitationPage}
          />

          {/* <ProtectedRoute exact path="/trips/:tripId" /> */}
          <ProtectedRoute
            exact
            path="/trips/:tripId"
            component={TripShowPage}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
