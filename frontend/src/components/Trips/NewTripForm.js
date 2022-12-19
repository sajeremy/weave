import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTripErrors, createTrip } from "../../store/trips";

function NewTripForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  //   const newTrip = useSelector((state) => state.trips.new);
  const errors = useSelector((state) => state.errors.trips);

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
      default:
        throw Error("Unknown field in Create Trip Form");
    }
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = {
      name,
      description,
      startDate,
      endDate,
    };
    dispatch(createTrip({ trip }));
  };
  return (
    <>
      <form className="NewTripForm" onSubmit={handleSubmit}>
        <label>
          New Trip Name
          <input
            type="text"
            onChange={update("name")}
            value={name}
            placeholder="New Trip Name"
          ></input>
        </label>

        <label>
          Description
          <input
            type="textarea"
            onChange={update("description")}
            value={description}
            placeholder="Describe your Trip!"
          ></input>
        </label>

        <label>
          Start Date:
          <input
            type="date"
            onChange={update("startDate")}
            value={startDate}
          ></input>
        </label>

        <label>
          End Date:
          <input
            type="date"
            onChange={update("endDate")}
            value={endDate}
          ></input>
        </label>
        <div className="errors">{errors && errors.name}</div>
        <input
          type="submit"
          value="Create New Trip"
          disabled={!name || !startDate || !endDate}
        />
      </form>
    </>
  );
}

export default NewTripForm;
