import React,{ useState, useEffect }  from "react";
import { dbService } from "./../fbase";
import styled from "styled-components";
import TweetForm from "components/form/TweetForm";
import Tweet from "components/Tweet";
import Header from 'components/Header';
import Loading from 'components/Loading';
import { useSelector } from 'react-redux';
import { setCurrentUser } from 'reducers/userApi';

function Home() {
  const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(false);

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
        setLoading(true);
      });
      console.log('useEffect 호출됨.');

      return () => {
        console.log('useEffect unmount 호출됨.');
      };
  }, []);
  useEffect(() => {
		return () => setLoading(false); 
	}, []);
  return (
    <>
    <Header locationName="HOME"/>

    <TweetsContainer>
      <TweetFormBox>
        <TweetForm />
      </TweetFormBox>

      <TweetList>
        {tweets.length !== 0 ? (
          tweets.map((tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet}></Tweet>
          ))
        ) : (
          <span>등록된 tweet이 없습니다.</span>
        )}
      </TweetList>
    </TweetsContainer>
      
    </>
  );
}

const TweetsContainer = styled.div``;
const TweetFormBox = styled.div`
  display: flex;
  padding: 17px 20px;
`;

const TweetList = styled.div``;
export default Home;
