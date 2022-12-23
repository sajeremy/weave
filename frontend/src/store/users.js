import jwtFetch from "./jwt";

const RECEIVE_USER = "session/RECEIVE_USER";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const fetchUser = (userId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}`);
  const user = await res.json();
  dispatch(receiveUser(user));
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { user: action.user };
    default:
      return state;
  }
};

export default usersReducer;
