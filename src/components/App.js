import React from "react";
import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import GlobalStyle from "style/GlobalStyle";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(true);
  return (
    <>
      {init ? <AppRouter /> : "Initializing..."}
      {/* <footer>&copy;{new Date().getFullYear()} BlueBird</footer> */}
    </>
  );
}

export default App;
