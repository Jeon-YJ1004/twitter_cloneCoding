import { React, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { authService, dbService } from "fbase";
import Tweet from "components/Tweet";

export default function MyTweets({ userObj, currentUser }) {
  // const [myTweets, setMyTweets] = useState([]);
  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, "tweets"),
  //     orderBy("createdAt", "desc"),
  //     where("creatorId", "==", userObj.id)
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const cp = [];
  //     querySnapshot.forEach((doc) => {
  //       cp.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setMyTweets(cp);
  //   });
  // }, [userObj.id]);
  return (
    <>
      {/* {myTweets.length !== 0 ? (
        myTweets.map((tweet, index) => {
          return (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === currentUser.uid}
              userObj={userObj}
            />
          );
        })
      ) : (
        <div>You don’t have any tweet yet</div>
      )} */}
    </>
  );
}
