import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-content-container">
        <div className="main-content">
          <div className="info-container">
            <h1>Plan anything, to anywhere, with anyone.</h1>
            <p>Weave your wishlist destinations into a seamless itinerary all in one place. Create your journey together.</p>
            <button className="create-trip-button">
              <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
              <span className="create-trip-text">Create New Trip</span>
            </button>
          </div>
        </div>
        <div className="media-section">
          <img className="media-picture" src={require('../../assets/canyon.png')}/>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
