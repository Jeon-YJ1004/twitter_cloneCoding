import React from "react";
import { useState, useRef } from "react";
import { dbService, storageService } from "../../fbase";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoIcon from "@mui/icons-material/Photo";
import MoodIcon from "@mui/icons-material/Mood";

function TweetForm({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [Emoji, setEmoji] = useState(false);
  const textRef = useRef();
  const fileRef = useRef();

  // 트윗 submit
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj === null) {
      alert("NotLogin");
      return;
    }
    let attachmentUrl = "";

    if (tweet === "" && attachment === "") {
      alert("사진이나 글이 필요합니다");
    }
    const randomId = uuidv4();
    if (attachment !== null) {
      //파일 업로드 시 저장될 ref 경로 생성. 파일을 버킷에 업로드
      const fileRef = storageService.ref().child(`${userObj.uid}/${randomId}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdTime: Date.now(),
      creatorId: userObj.uid,
      displayName: userObj.displayName,
      creatorImg: userObj.photoURL,
      randomId: randomId,
      like: [],
      reply: [],
      retweet: [],
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setEmoji(false);
    setAttachment();
  };

  const onTextChange = (event) => {
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
    const uploadFileName = theFile?.name;

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    setFileName(`${uploadFileName}_${Date.now()}`);
  };

  const onClearImgClick = () => {
    setAttachment(null);
    fileRef.current.value = null;
  };

  const onEmojiInput = (event, emojiObject) => {
    const beforeEmojiText = textRef.current.value;
    const inputValue = beforeEmojiText + emojiObject.emoji;
    setTweet(inputValue);
  };

  const onEmojiClick = () => {
    setEmoji(!Emoji);
  };

  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <FormTextInput
          type="text"
          value={tweet}
          onChange={onTextChange}
          placeholder="what's on your mind"
          maxLength={100}
          ref={textRef}
          required
        />
        <FormImgInput
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileRef}
          id="imgUploadBtn"
        />
        {attachment && (
          <ImgContainer>
            <AttachedImg
              src={attachment}
              width="50px"
              height="50px"
              alt="tweet"
            />
            <button onClick={onClearImgClick}>
              <ImgCloseBtn />
            </button>
          </ImgContainer>
        )}
        <IconContainer>
          <StyledIcon>
            <label htmlFor="imgUploadBtn">
              <PhotoIcon />
            </label>
          </StyledIcon>
          <StyledIcon>
            <MoodIcon onClick={onEmojiClick}></MoodIcon>
          </StyledIcon>
          {Emoji ? <EmojiPicker onEmojiClick={onEmojiInput} /> : null}
          <FormSumbitInput type="submit" value="Tweet" />
        </IconContainer>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  position: relative;
`;
const FormTextInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 0px;
  padding-left: 4px;
  padding-right: 30px;

  box-sizing: border-box;
  font-size: 18px;
  border-radius: 4px;
  color: #989898;
  &::placeholder {
    color: #989898;
  }
`;
const FormImgInput = styled.input`
  display: none;
`;
const ImgContainer = styled.div`
  position: relative; ;
`;
const AttachedImg = styled.img`
  width: 490px;
  height: 280px;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;
const IconContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin-top: 10px;
  position: relative;
`;
const StyledIcon = styled.div`
  fill: #bebebe;
  height: 21px;
  cursor: pointer;
  border-radius: 50%;
  padding: 7px;
  &:hover {
    fill: ${(props) => (props.current === "true" ? "#1DA1F2" : "#bebebe")};
    background-color: ${(props) =>
      props.current === "true" ? "#1e2125" : "#e6f3ff"};
  }
`;
const FormSumbitInput = styled.input`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  color: white;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  background-color: #98cff8;
  margin-left: auto;
`;
const ImgCloseBtn = styled(CancelIcon)`
  position: absolute;
  top: 5px;
  left: 6px;
  font-size: 17px;
  padding: 7px 9px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
`;

export default TweetForm;
