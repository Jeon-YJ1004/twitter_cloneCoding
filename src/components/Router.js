import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoginToken } from "reducers/userApi";
import styled from 'styled-components';
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Explore from "routes/Explore";
import Bookmark from "routes/Bookmark";
import Tweet from 'routes/Tweet';
import SideBar from "components/SideBar";

const AppRouter = () => {
  const dispatch = useDispatch();
  const loginToken = useSelector((state) => state.user.loginToken);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    let loginToken = sessionStorage.getItem("loginToken");
    if (loginToken === null || !loginToken) {
      dispatch(setLoginToken("logout"));
      dispatch(
        setCurrentUser({
          photoURL: "",
          uid: "",
          displayName: "",
          email: "",
          bookmark: [],
          retweet: [],
          bgURL: "",
        })
      );
      console.log("유저 정보 없음");
    } else console.log("유저 정보 있음!");
  }, []);
  return (
    
    <Router>
      <SideContainer>
        <StyledSideBar />
      </SideContainer>
       <CenterContainer>
        {loginToken === "login" && currentUser?
         <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile/:id/tweets">
            <Profile />
          </Route>
          <Route exact path="/profile/:id/likes">
            <Profile />
          </Route>
          <Route exact path="/profile/:id/retweets">
            <Profile />
          </Route>
          <Route exact path="/bookmark">
            <Bookmark />
          </Route>
          <Route exact path="/explore/:type">
            <Explore />
          </Route>
          <Route exact path="/tweet/:id">
            <Tweet/>
          </Route>
       </Switch>:
       <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/explore/:type">
            <Explore />
          </Route>
          <Route exact path="/tweet/:id">
            <Tweet/>
          </Route>
          <Route exact from="*" to="/" />
        </Switch>
        }
        
        </CenterContainer>
    </Router>
  );
};
const SideContainer = styled.div`
  width: 280px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledSideBar = styled(SideBar)`
display: flex; 
padding-left: 16rem; 
flex-direction: column; 
flex: 1 1 0%; 
`;

const CenterContainer = styled.div`
display: flex; 
padding-left: 16rem; 
flex-direction: column; 
flex: 1 1 0%; 
`;


export default AppRouter;
