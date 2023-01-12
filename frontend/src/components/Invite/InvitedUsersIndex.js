import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inviteTripMember } from "../../store/trips";
import InvitedUsersIndexItem from "./InvitedUsersIndexItem";

function InvitedUsersIndex({ trip }) {
  const invitedUsers = Object.values(invitedUsers);

  const dispatch = useDispatch();
  const [membersInput, setMembersInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const trips = useSelector((state) => state.trips);

  const handleInvite = (e) => {
    e.preventDefault();
    const members = membersInput.split(", ");

    if (members.every(validateEmail)) {
      const tripId = trip._id;
      const data = {
        tripId,
        members,
      };
      dispatch(inviteTripMember(data));
      setMembersInput("");
    } else {
      setEmailError("Invalid Email(s)");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <div className="invitedusers-container">
        {trips.trip &&
          trips.trip.invitedUsers &&
          trips.trip.invitedUsers.map((user) => {
            return <InvitedUsersIndexItem user={user} />;
          })}
      </div>
      <form>
        <label>
          <input
            type="text"
            onChange={(e) => setMembersInput(e.target.value)}
            value={membersInput}
            placeholder="Enter email to invite"
          ></input>
        </label>
        <button
          className="invite-button"
          onClick={handleInvite}
          disabled={!membersInput}
        >
          +
        </button>
        <div className="errors">{emailError && emailError}</div>
      </form>
    </>
  );
}

export default InvitedUsersIndex;
