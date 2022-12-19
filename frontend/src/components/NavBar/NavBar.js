import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import { logout } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/trips"}>All Trips</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/trips/new"}>Make a Trip</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ); 
    } else {
      return (
        <div className="links-auth">
          <Link to={"/signup"} className="nav-signup-link">Signup</Link>
          <Link to={"/login"} className="nav-login-link"><button>Login</button></Link>
        </div>
      );
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <h1>weave</h1>
      </div>
      <div className="right-nav">
      {getLinks()}
      </div>
    </div>
  );
}

export default NavBar;
