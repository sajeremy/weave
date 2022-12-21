import './CreateTripModal.scss';
import { Link } from 'react-router-dom';

const CreateTripModal = () => {
    return (
        <div className="login-modal-container">
            <h1>Plan a new trip</h1>
            <div className="name-input-wrapper">
                <label className="name-label">Name</label>
                <input className="login-name-input"></input>
            </div>
            <div className="date-wrapper">
                <div className="start-date-wrapper">
                    <label className="start-label">Start Date</label>
                    <input type="date" className="start-date"></input>
                </div>
                <div className="end-date-wrapper">
                    <label> End Date
                        <input type="date" className="end-date"></input>
                    </label>
                </div>
            </div>
            <button className="login-signup-button" to="#">Log in or Sign up to Invite Tripmates</button>
            <button className="create-trip-button">
              <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
              <span className="create-trip-text">Create New Trip</span>
            </button>
        </div>
    )
}

export default CreateTripModal;