import './MainPage.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateTripModal from '../CreateTripModal/CreateTripModal';
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import Modal from '../Modal/Modal';

const MainPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const loggedIn = useSelector((state) => !!state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  // const [counter, setCounter] = useState(0);

  const slides = document.getElementsByClassName("media-picture");
  let counter = 0;
  useEffect(() => {
  const timer = setInterval(() => {
    // debugger
    slides[counter].classList.remove("active");
    counter++;
    if (counter >= 2) counter = 0;
    slides[counter].classList.add("active");
  },3000);

  return () => clearInterval(timer);
  },[]);
  
  const modalFunctions = {
    setShowLoginModal: (shown) => setShowLoginModal(shown),
    setShowSignupModal: (shown) => setShowSignupModal(shown)
  }
  
  const handleCreateTrip = () => {
    if(loggedIn) {
      setShowCreateModal(true);
    } else {
      setShowLoginModal(true);
    }
  }

  return (
    <>
      <div className="main-page">
        <div className="main-content-container">
          <div className="main-content">
            <div className="info-container">
              <h1>Plan anything, to anywhere, with anyone.</h1>
              <p>Weave your wishlist destinations into a seamless itinerary all in one place. Create your journey together.</p>
              <button onClick={handleCreateTrip} className="create-trip-button">
                <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
                <span className="create-trip-text">Create New Trip</span>
              </button>
            </div>
          </div>
          <div className="media-section">
            <img id="slide-1" className="media-picture active" src={require('../../assets/canyon.png')}/>
            <img id="slide-2" className="media-picture" src={require('../../assets/mountain.png')}/>
            <img id="slide-3" className="media-picture" src={require('../../assets/valley.png')}/>
          </div>
        </div>
      </div>
      {showCreateModal && <Modal component={CreateTripModal} close={() => setShowCreateModal(false)} />}
      {showLoginModal && <Modal component={LoginModal} close={() => setShowLoginModal(false)} modalFunctions={modalFunctions} />}
      {showSignupModal && <Modal component={SignupModal} close={(shown) => setShowSignupModal(shown)} modalFunctions={modalFunctions} />}
    </>
  );
}

export default MainPage;
