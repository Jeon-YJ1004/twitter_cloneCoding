import React from "react";
import { dbService } from "./../fbase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TweetForm from "components/form/TweetForm";
import Tweet from "components/Tweet";
import SideBar from "components/SideBar";
import PersonIcon from "@mui/icons-material/Person";

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    //realtime으로 db에서 받아오기
    dbService
      .collection("tweets")
      .orderBy("createdTime", "desc")
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
      <SideContainer>
        <StyledSideBar userObj={userObj} />
      </SideContainer>
      <CenterContainer>
        <TweetsContainer>
          <TweetFormBox>
            {userObj.photoURL ? (
              <UserImg src={userObj.photoURL} />
            ) : (
              <PersonIcon />
            )}
            <TweetForm userObj={userObj} />
          </TweetFormBox>

          <TweetList>
            {tweets.length !== 0 ? (
              tweets.map((tweet) => (
                <Tweet
                  key={tweet.id}
                  tweetObj={tweet}
                  isOwner={tweet.creatorId === userObj.uid}
                  userObj={userObj}
                ></Tweet>
              ))
            ) : (
              <span>등록된 tweet이 없습니다.</span>
            )}
          </TweetList>
        </TweetsContainer>
      </CenterContainer>
    </>
  );
}
const SideContainer = styled.div`
  width: 280px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledSideBar = styled(SideBar)`
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  padding-right: 20px;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 15px;
`;
const CenterContainer = styled.div`
  width: 590px;
  max-width: 590px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const TweetsContainer = styled.div``;
const TweetFormBox = styled.div`
  display: flex;
  padding: 17px 20px;
`;
const UserImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
`;
const TweetList = styled.div``;
export default Home;
