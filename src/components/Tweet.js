import { React, useState } from "react";
import { dbService, storageService } from "./../fbase";

export default function Nweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false); //edit 모드 t/f
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("ㄹㅇ 삭제 이 트윗?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if(tweetObj.attachmentUrl) await storageService.ref(`${tweetObj.creatorId}/${tweetObj.randomId}`).delete()
      // if(tweetObj.attachmentUrl) await storageService.refFromURL(tweetObj.attachmentUrl).delete()
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(tweetObj.newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setEditing(false);
  };
  const onChange = (event) => {
    // const {
    //   taget: { value },
    // } = event; //문법 오류
    setNewTweet(event.target.value);
  };
  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTweet}
              placeholder="edit your tweet"
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  );
}
