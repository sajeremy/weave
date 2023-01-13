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
    setShowSignupModal: (shown) => setShowSignupModal(shown)
  }

  const getLinks = () => {
    if (loggedIn) {
      if(showSignupModal) {
        setShowSignupModal(false);
      }
      if(showLoginModal) {
        setShowLoginModal(false);
      }
      return (
        <div className="links-nav">
          {/* <Link to={"/trips"}>All Trips</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/trips/new"}>Make a Trip</Link> */}
          <Link to="/about" className="nav-left-button">About</Link>
          <Link className="nav-middle-button" to={"/profile"}>My Trips</Link>
          <button className="nav-right-button" onClick={logoutUser}>Logout</button>
        </div>
      ); 
    } else {
      return (
        <div className="links-auth">
          <Link to="/about" className="nav-left-button">About</Link>
          <button className="nav-middle-button" onClick={(shown) => setShowLoginModal(shown)}>Login</button>
          <button className="nav-right-button" onClick={(shown) => setShowSignupModal(shown)}>Signup</button>
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
    {showLoginModal && <Modal component={LoginModal} close={() => setShowLoginModal(false)} modalFunctions={modalFunctions} />}
    {showSignupModal && <Modal component={SignupModal} close={(shown) => setShowSignupModal(shown)} modalFunctions={modalFunctions} />}
    </>
  );
}

export default NavBar;
