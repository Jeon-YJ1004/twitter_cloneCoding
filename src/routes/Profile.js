import React, { useEffect, useState, useCallback } from "react";
import { authService, dbService } from "fbase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import LikeTweets from "components/Profile/LikeTweets";
import MyTweets from "components/Profile/MyTweets";
import ReTweets from "components/Profile/ReTweets";
import UpdateProfileForm from "components/form/UpdateProfileForm";
import EventIcon from "@mui/icons-material/Event";

function Profile({ match }) {
  const uid = match.params.id;
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});

  const [myTweets, setMyTweets] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [updateState, setUpdateState] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const getUserInfo = useCallback(async () => {
    await onSnapshot(doc(dbService, "users", uid), (doc) => {
      setUserInfo(doc.data());
      setLoading(true);
    });
  }, [uid]);

  const getTime = (time) => {
    const now = parseInt(time);
    const date = new Date(now);
    const getFullYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    return `${getFullYear}년 ${getMonth}월 ${getDate}일`;
  };

  const getMyTweets = useCallback(async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  }, [uid]);

  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNewDisplayName(value);
  // };

  const updateModalOpen = () => setUpdateModal(true);
  const updateModalClose = () => {
    setUpdateModal(false);
  };

  useEffect(() => {
    getUserInfo();
    getMyTweets();
  }, [getUserInfo, getMyTweets, updateState]);

  return (
    <>
      <ProfileContainer>
        {/* {userObj.uid===} */}
        <BGImgae />
        <ButtonContainer>
          <ProfileUpdateBtn onClick={updateModalOpen}>
            Update Profile
          </ProfileUpdateBtn>
        </ButtonContainer>
        {uid === currentUser.uid ? (
          <UpdateProfileForm
            updateModal={updateModal}
            updateModalOpen={updateModalOpen}
            updateModalClose={updateModalClose}
          ></UpdateProfileForm>
        ) : (
          <div></div>
        )}

        <ImageContainer>
          <ProfileImage src={userInfo.photoURL} alt="user Image" />
        </ImageContainer>

        <ProfileInfo>
          <UserName>{userInfo.newDisplayName}</UserName>
          <UserInfo>{userInfo.email}</UserInfo>
          <UserInfo>
            <EventIcon />
            Since {getTime(userInfo.creationTime)}
          </UserInfo>

          <UserDesc></UserDesc>
        </ProfileInfo>
      </ProfileContainer>
      <ProfileMenu>
        <MenuLink to={MyTweets}>Tweets</MenuLink>
        <MenuLink to={LikeTweets}>Likes</MenuLink>
        <MenuLink to={ReTweets}>Retweets</MenuLink>
      </ProfileMenu>
      <Switch>
        <Route path="/profile/tweet/:id" component={MyTweets} />
        <Route path="/profile/like/:id" component={LikeTweets} />
        <Route path="/profile/retweet/:id" component={ReTweets} />
      </Switch>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  padding-left: 16rem;
  flex-direction: column;
  flex: 1 1 0%;
`;
const BGImgae = styled.div`
  height: 12rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  padding-right: 1rem;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 4rem;
`;
const ProfileUpdateBtn = styled.div`
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  border-width: 1px;
  border-color: #d1d5db;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  width: 8rem;
  height: 8rem;
`;
const ProfileImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 8rem;
  border-radius: 9999px;
`;

const ProfileInfo = styled.div`
  display: flex;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-bottom: 1rem;
  flex-direction: column;
  width: 100%;
`;
const UserDesc = styled.p`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #1f2937;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
`;
const UserName = styled.h1`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
`;
const UserInfo = styled.p`
  margin-bottom: 0.5rem;
  color: #9ca3af;
`;
const ProfileMenu = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const MenuLink = styled(Link)`
  width: 33%%;
`;
export default Profile;
