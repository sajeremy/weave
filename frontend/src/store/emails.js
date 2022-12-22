import jwtFetch from "./jwt";

const RECEIVE_EMAIL = "emails/RECEIVE_EMAIL";
const CLEAR_EMAIL_ERRORS = "emails/CLEAR_EMAIL_ERRORS";

const receiveEmail = (email) => ({
  type: RECEIVE_EMAIL,
  email,
});


const receiveErrors = (errors) => ({
  type: RECEIVE_EMAIL_ERRORS,
  errors
});

const removeEmail = (emailId) => ({
  type: REMOVE_TRIP,
  emailId
});

export const clearEmailErrors = (errors) => ({
  type: CLEAR_EMAIL_ERRORS,
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

export const updateTrip = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/trips/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const trip = await res.json();
    dispatch(receiveTrip(trip));
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
      return { ...state, ...action.trips, new: undefined };
    case RECEIVE_TRIP:
      return { ...state, ...action.trip, new: undefined };
    case RECEIVE_USER_TRIPS:
      return { ...state, ...action.trips, new: undefined };
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
