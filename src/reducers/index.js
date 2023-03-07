import { combineReducers } from "redux";
import user from "./userApi";

export const USER_LOGOUT = "USER_LOGOUT";
export const settingLogOut = () => ({
  type: USER_LOGOUT,
});

const reducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;
