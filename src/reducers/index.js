import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./userApi";

export const USER_LOGOUT = "USER_LOGOUT";
export const settingLogOut = () => ({
  type: USER_LOGOUT,
});

const persistConfig = {
  //reducer의 어느지점에서부터 데이터 저장 할것인지
  key: "root",
  //localStorage에 저장
  storage,
};
const rootReducer = combineReducers({
  user,
});

// const rootReducer = (state, action) => {
//   if (action.type === USER_LOGOUT) {
//     state = undefined;
//   }
//   return reducer(state, action);
// };

export default persistReducer(persistConfig, rootReducer)