import React from "react";
import { dbService, storageService } from "./../fbase";
import { useState, useEffect, useRef } from "react";

import TweetFactory from "components/TweetFactory";
import Tweet from "../components/Tweet";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();

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
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          ></Tweet>
        ))}
      </div>
    </>
  );
}

export default Home;
