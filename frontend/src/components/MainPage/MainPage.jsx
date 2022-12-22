import './MainPage.scss';
import { useEffect, useState } from 'react';
import CreateTripModal from '../CreateTripModal/CreateTripModal';
import Modal from '../Modal/Modal';

const MainPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [counter, setCounter] = useState(0);

  const slides = document.getElementsByClassName("media-picture");
  // const timer = setInterval(() => {
  //   slides[slide].classList.remove("active");
  //   slide++;
  //   if (slide >= 2) slide = 0;
  //   slides[slide].classList.add("active");
  // },3000);
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
  

    // return () => clearInterval(timer);

  // }, [])
  // console.log(slides);
  // slides.each((slide) => {
  //   console.log(slide);
  // })

  return (
    <>
      <div className="main-page">
        <div className="main-content-container">
          <div className="main-content">
            <div className="info-container">
              <h1>Plan anything, to anywhere, with anyone.</h1>
              <p>Weave your wishlist destinations into a seamless itinerary all in one place. Create your journey together.</p>
              <button onClick={() => setShowCreateModal(true)} className="create-trip-button">
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
    </>
  );
}

export default MainPage;
