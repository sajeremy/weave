import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import { logout } from "../../store/session";
import Modal from "../Modal/Modal";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";

const NavBar = () =>  {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const modalFunctions = {
    setShowLoginModal: (shown) => setShowLoginModal(shown),
    setShowSignupModal: (shown) => setShowLoginModal(shown)
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          {/* <Link to={"/trips"}>All Trips</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/trips/new"}>Make a Trip</Link> */}
          <Link className="trips-button" to={"/profile"}>My Trips</Link>
          <button className="nav-logout-button" onClick={logoutUser}>Logout</button>
        </div>
      ); 
    } else {
      return (
        <div className="links-auth">
          <button className="nav-signup-button" onClick={() => setShowSignupModal(true)}>Signup</button>
          <button className="nav-login-button" onClick={() => setShowLoginModal(true)}>Login</button>
        </div>
      );
    }
  };

  return (
    <>
    <div className="navbar-container">
      <div className="logo-wrapper">
        <Link to="/" className="home-logo-link"><h1>weave</h1></Link>
      </div>
      <div className="right-nav">
      {getLinks()}
      </div>
    </div>
    {showLoginModal && <Modal component={LoginModal} close={(shown) => setShowLoginModal(shown)} modalFunctions={modalFunctions} />}
    {showSignupModal && <Modal component={SignupModal} close={(shown) => setShowSignupModal(shown)} modalFunctions={modalFunctions} />}
    </>
  );
}

export default NavBar;
