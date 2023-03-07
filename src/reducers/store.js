import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "reducers/index";

const persistConfig = {
  //reducer의 어느지점에서부터 데이터 저장 할것인지
  key: "root",
  //localStorage에 저장
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =
  configureStore({
    reducer: rootReducer,
  });

//export const persistor = persistStore(store);