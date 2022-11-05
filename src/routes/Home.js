import React from "react";
import { dbService } from "./../fbase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TweetFactory from "components/TweetFactory";
import Tweet from "../components/Tweet";
import SideBar from "./../components/SideBar";
import PersonIcon from "@mui/icons-material/Person";

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    //realtime으로 db에서 받아오기
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  return (
    <>
      {/* <SideContainer>
        <SideBar userObj={userObj} />
      </SideContainer> */}
      <TweetsContainer>
        {userObj.photoURL ? <UserImg src={userObj.photoURL} /> : <PersonIcon />}
        <TweetFactory userObj={userObj} />
        <TweetList>
          {tweets.length !== 0 ? (
            tweets.map((tweet) => (
              <Tweet
                key={tweet.id}
                tweetObj={tweet}
                isOwner={tweet.creatorId === userObj.uid}
              ></Tweet>
            ))
          ) : (
            <span>등록된 tweet이 없습니다.</span>
          )}
        </TweetList>
      </TweetsContainer>
    </>
  );
}
const SideContainer = styled.div`
  width: 280px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TweetsContainer = styled.div`
  width: 590px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const UserImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
`;
const TweetList = styled.div``;
export default Home;
