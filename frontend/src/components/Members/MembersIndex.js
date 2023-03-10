import MemberIndexItem from "./MemberIndexItem";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { inviteTripMember } from "../../store/trips";
import "./MembersIndex.scss";

function MemberIndex({ trip }) {
  // const dispatch = useDispatch();
  // const [membersInput, setMembersInput] = useState("");
  // const [emailError, setEmailError] = useState("");

  // const handleInvite = (e) => {
  //   e.preventDefault();
  //   const members = membersInput.split(", ");

  //   if (members.every(validateEmail)) {
  //     const tripId = trip._id;
  //     const data = {
  //       tripId,
  //       members,
  //     };
  //     dispatch(inviteTripMember(data));
  //     setMembersInput("");
  //   } else {
  //     setEmailError("Invalid Email(s)");
  //   }
  // };

  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };

  return (
    <>
      <div className="member-heading">Tripmates</div>
      <div className="member-container">
        {trip.members &&
          trip.members.map((member, index) => {
            if (member._id !== trip.owner)
              return (
                <MemberIndexItem
                  key={member._id}
                  member={member}
                  index={index}
                />
              );
          })}
      </div>
      {/* <form>
        <label>
          <input
            type="text"
            onChange={(e) => setMembersInput(e.target.value)}
            value={membersInput}
            placeholder="Enter email to invite"
          ></input>
        </label>
        <button className="invite-button" onClick={handleInvite}>+</button>
        <div className="errors">{emailError && emailError}</div>
      </form> */}
    </>
  );
}

export default MemberIndex;
