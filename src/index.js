import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App";
import { BrowserRouter } from "react-router-dom";
import  {store, persistor } from "./reducers/store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
      <App/>
    </BrowserRouter>
  </Provider>
);
