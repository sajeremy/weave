import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";
import { tripErrorsReducer } from "./trips";

export default combineReducers({
  session: sessionErrorsReducer,
  trips: tripErrorsReducer,
});
