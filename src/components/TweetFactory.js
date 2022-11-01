import React from "react";
import { useState, useRef } from "react";
import { dbService, storageService } from "./../fbase";
import { v4 as uuidv4 } from "uuid";
function TweetFactory({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    const randomId = uuidv4();
    if (attachment !== null) {
      const fileRef = storageService.ref().child(`${userObj.uid}/${randomId}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      randomId: randomId,
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={onChange}
          placeholder="what's on your mind"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="tweet" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
}

export default TweetFactory;
