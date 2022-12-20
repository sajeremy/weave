import jwtFetch from "./jwt";

const RECEIVE_TRIPS = "trips/RECEIVE_TRIPS";
const RECEIVE_TRIP = "trips/RECEIVE_TRIP";
const RECEIVE_USER_TRIPS = "trips/RECEIVE_USER_TRIPS";
const RECEIVE_NEW_TRIP = "trips/RECEIVE_NEW_TRIP";
const REMOVE_TRIP = "trips/REMOVE_TRIP";
const RECEIVE_TRIP_ERRORS = "trips/RECEIVE_TRIP_ERRORS";
const CLEAR_TRIP_ERRORS = "trips/CLEAR_TRIP_ERRORS";

const receiveTrips = (trips) => ({
  type: RECEIVE_TRIPS,
  trips,
});

const receiveTrip = (trip) => ({
  type: RECEIVE_TRIP,
  trip,
});

const receiveUserTrips = (trips) => ({
  type: RECEIVE_USER_TRIPS,
  trips,
});

const receiveNewTrip = (trip) => ({
  type: RECEIVE_NEW_TRIP,
  trip,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_TRIP_ERRORS,
  errors,
});

const removeTrip = (tripId) => ({
  type: REMOVE_TRIP,
  tripId,
});

export const clearTripErrors = (errors) => ({
  type: CLEAR_TRIP_ERRORS,
  errors,
});

export const fetchTrips = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/trips");
    const trips = await res.json();
    dispatch(receiveTrips(trips));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchTrip = (tripId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/trips/${tripId}`);
    const trip = await res.json();
    dispatch(receiveTrip(trip));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserTrips = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/${userId}`);
    const trips = await res.json();
    dispatch(receiveUserTrips(trips));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createTrip = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/trips", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const trip = await res.json();
    dispatch(receiveNewTrip(trip));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const deleteTrip = (tripId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/trips/${tripId}`, {
      method: "DELETE",
    });
    dispatch(removeTrip(tripId));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const tripErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_TRIP_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TRIP:
    case CLEAR_TRIP_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const tripsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return { ...state, all: action.trips, new: undefined };
    case RECEIVE_TRIP:
      return { ...state, trip: action.trip, new: undefined };
    case RECEIVE_USER_TRIPS:
      return { ...state, user: action.trips, new: undefined };
    case RECEIVE_NEW_TRIP:
      return { ...state, new: action.trip };
    //   case RECEIVE_USER_LOGOUT:
    //     return { ...state, user: {}, new: undefined };
    case REMOVE_TRIP:
      delete { ...state, all: action.tripId };
      return state;
    default:
      return state;
  }
};

export default tripsReducer;
