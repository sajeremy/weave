import './CreateTripModal.scss';
import React from "react";
// import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTripErrors, createTrip, inviteTripMember } from "../../store/trips";
import { useHistory } from 'react-router-dom';

const CreateTripModal = ({close, modalFunctions}) => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [membersInput, setMembersInput] = useState("");
    const [emailError, setEmailError] = useState("")
    const dispatch = useDispatch();
    const newTrip = useSelector((state) => state.trips.new);
    const errors = useSelector((state) => state.errors.trips);
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        return () => dispatch(clearTripErrors());
      }, [dispatch]);
    
      const update = (field) => {
        let setState;
    
        switch (field) {
          case "name":
            setState = setName;
            break;
          case "description":
            setState = setDescription;
            break;
          case "startDate":
            setState = setStartDate;
            break;
          case "endDate":
            setState = setEndDate;
            break;
          case "membersInput":
            setState = setMembersInput;
            break;
          default:
            throw Error("Unknown field in Create Trip Form");
        }
        return (e) => setState(e.currentTarget.value);
      };
    
    const handleSubmit = (e) => {
      e.preventDefault();  
      const members = membersInput.split(", ")
      if (members.every(validateEmail)|| membersInput === ''){
  
      const trip = {
        name,
        description,
        startDate,
        endDate,
      };      
      dispatch(createTrip({ trip }));
        } else {
          setEmailError("Invalid Email(s)")
        }
    };
            
    if (newTrip){
      const members = membersInput.split(", ")
      const tripId = newTrip._id
      const data = {
        tripId, 
        members,
      }
      dispatch(inviteTripMember(data))
      history.push(`/trips/${newTrip._id}`)
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSwitchSignup = () => {
      close(false);
      modalFunctions.setShowSignupModal(true);
    }

    return (
        <form className="create-trip-form" onSubmit={handleSubmit}>
            <h1>Plan a new trip</h1>
            <div className="name-input-wrapper">
                <label className="name-label">Name</label>
                <input type="text"
                    onChange={update("name")}   
                    value={name}
                    className="login-name-input">
                </input>
            </div>
            <div className="date-wrapper">
                <div className="start-date-wrapper">
                    <label className="start-label">Start Date</label>
                    <input type="date" 
                        onChange={update("startDate")}
                        value={startDate}
                        className="start-date">
                    </input>
                </div>
                <div className="end-date-wrapper">
                    <label> End Date
                        <input type="date" 
                            className="end-date"
                            onChange={update("endDate")}
                            value={endDate}>
                        </input>
                    </label>
                </div>
            </div>
            <div className="errors">{errors && errors.name}</div>
            <div className="invitation-wrapper">
              <label className="invitation-label"> Invite Your Tripmates </label>
                <input type="text" 
                  className='invitation-input'
                  onChange={update("membersInput")}
                  value={membersInput}>
               </input>
            </div>

            <div className="errors">{emailError && emailError}</div>

            {!currentUser && <button className="login-signup-button" onClick={handleSwitchSignup}>Log in or Sign up to Invite Tripmates</button>}
            <button type="submit" 
                className="create-trip-button"
                disabled={!name || !startDate || !endDate}>
                <img className="map-icon" src={require('../../assets/mapicon.png')}></img>
                <span className="create-trip-text">Create New Trip</span>
            </button>
        
        </form>

    )
}

export default CreateTripModal;


//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const dispatch = useDispatch();
//   //   const newTrip = useSelector((state) => state.trips.new);
//   const errors = useSelector((state) => state.errors.trips);
//   const currentUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     return () => dispatch(clearTripErrors());
//   }, [dispatch]);

//   const update = (field) => {
//     let setState;

//     switch (field) {
//       case "name":
//         setState = setName;
//         break;
//       case "description":
//         setState = setDescription;
//         break;
//       case "startDate":
//         setState = setStartDate;
//         break;
//       case "endDate":
//         setState = setEndDate;
//         break;
//       default:
//         throw Error("Unknown field in Create Trip Form");
//     }
//     return (e) => setState(e.currentTarget.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const trip = {
//       name,
//       description,
//       startDate,
//       endDate,
//     };

//     dispatch(createTrip({ trip }));
//   };
//   return (
//     <>
//       <form className="NewTripForm" onSubmit={handleSubmit}>
//         <label>
//           New Trip Name
//           <input
//             type="text"
//             onChange={update("name")}
//             value={name}
//             placeholder="New Trip Name"
//           ></input>
//         </label>

//         <label>
//           Description
//           <input
//             type="textarea"
//             onChange={update("description")}
//             value={description}
//             placeholder="Describe your Trip!"
//           ></input>
//         </label>

//         <label>
//           Start Date:
//           <input
//             type="date"
//             onChange={update("startDate")}
//             value={startDate}
//           ></input>
//         </label>

//         <label>
//           End Date:
//           <input
//             type="date"
//             onChange={update("endDate")}
//             value={endDate}
//           ></input>
//         </label>
//         <div className="errors">{errors && errors.name}</div>
//         <input
//           type="submit"
//           value="Create New Trip"
//           disabled={!name || !startDate || !endDate}
//         />
//       </form>
//     </>
//   );
// }

