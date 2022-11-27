import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { ref } from "firebase/storage";
import styled from "styled-components";

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
      <div onClick={onUpdateClick}>update Profile</div>

      <ProfileContainer onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="new name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </ProfileContainer>
    </div>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileFormImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 5px solid #d0d0d0;
  cursor: pointer;
`;
const ProfileFormSubmit = styled.input`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  color: white;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  background-color: var(--twitter-color);
  &:hover {
    background-color: var(--twitter-dark-color);
  }
`;

export default Profile;
