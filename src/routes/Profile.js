import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";

import { ref } from "firebase/storage";
import styled from "styled-components";

import LikeTweets from "components/Profile/LikeTweets";
import MyTweets from "components/Profile/MyTweets";
import ReTweets from "components/Profile/ReTweets";
import { Menu } from "@mui/material";
function Profile({ refreshUser, userObj }) {
  const history = useHistory();
  const createdTime = userObj.cre;
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    const data = await dbService.collection("users").doc(userObj.uid);
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };
  const onUpdateClick = () => {};
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <div>
      <div>{newDisplayName}</div>

      <ProfileContainer>
        <div onClick={onUpdateClick}>update Profile</div>
        <ProfileImage src={userObj.photoURL} alt="user Image" />
        <div></div>
      </ProfileContainer>
      <ProfileMenu>
        <MenuLink to={MyTweets} onClick>
          tweets
        </MenuLink>
        <MenuLink to={LikeTweets} onClick>
          likes
        </MenuLink>
        <MenuLink to={ReTweets} onClick>
          reTweets
        </MenuLink>
      </ProfileMenu>
      <Switch>
        <Route path="/profile/tweet/:id" component={MyTweets} />
        <Route path="/profile/like/:id" component={LikeTweets} />
        <Route path="/profile/retweet/:id" component={ReTweets} />
      </Switch>
    </div>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 5px solid #d0d0d0;
  cursor: pointer;
`;
const ProfileMenu = styled.div``;
const MenuLink = styled(Link)``;
export default Profile;
