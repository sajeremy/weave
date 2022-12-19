import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/trips" /> //  Should redirect to splash if not logged in. Not sure if we want to redirect to user profiel or trips index.
        )
      }
    />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
