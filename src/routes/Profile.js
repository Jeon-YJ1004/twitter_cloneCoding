import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { ref } from "firebase/storage";

function Profile({ refreshUser, userObj }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
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
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="new name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out </button>
    </>
  );
}

export default Profile;