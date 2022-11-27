import React from "react";
import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import GlobalStyle from "style/GlobalStyle";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      creationTime: user.metadata.a,
      lastSignInTime: user.metadata.b,
      updateProfile: (name) => user.updateProfile(name),
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((userObj) => {
      if (userObj) {
        if (userObj.auth.displayName === null) {
          const name = userObj.email.split("@")[0];
          userObj.displayName = name;
        }
        setIsLoggedIn(true);
        setUserObj({
          displayName: userObj.displayName,
          uid: userObj.uid,
          email: userObj.email,
          photoURL: userObj.photoURL,
          creationTime: userObj.metadata.a,
          lastSignInTime: userObj.metadata.b,
          updateProfile: (name) => userObj.updateProfile(name),
        });
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <GlobalStyle />

      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy;{new Date().getFullYear()} BlueBird</footer> */}
    </>
  );
}

export default App;
