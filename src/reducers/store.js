import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import rootReducer from "reducers/index";

//const middlewares = [logger];
export const store =
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
serializableCheck: false
}),
  });
export const persistor = persistStore(store);
