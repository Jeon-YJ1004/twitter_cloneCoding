import { React, useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "./../fbase";

import PersonIcon from "@mui/icons-material/Person";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RepeatIcon from "@mui/icons-material/Repeat";
import CheckIcon from "@mui/icons-material/Check";
import BackspaceIcon from "@mui/icons-material/Backspace";

export default function Nweet({ tweetObj, isOwner, userObj }) {
  const [isEditing, setIsEditing] = useState(false); //edit 모드 t/f
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 삭제합니다?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if (tweetObj.attachmentUrl)
        await storageService
          .ref(`${tweetObj.creatorId}/${tweetObj.randomId}`)
          .delete();
      // if(tweetObj.attachmentUrl) await storageService.refFromURL(tweetObj.attachmentUrl).delete()
    }
  };
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    setNewTweet(tweetObj.text);
  };
  //트윗  편집
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(tweetObj.newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setIsEditing(false);
  };
  //트윗 편집 취소
  const onCancelEdit = () => {
    setNewTweet(newTweet);
    setIsEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const getDatetoString = (d) => {
    console.log(tweetObj);
    var date = new Date(d);
    let str =
      date.getFullYear() +
      "년 " +
      Number(date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 ";
    return str;
  };
  return (
    <PostedTweetContainer>
      {isEditing ? (
        <>
          {isOwner && (
            <>
              <WriterImg
                src={
                  tweetObj.creatorImgs ? tweetObj.creatorImgs : <PersonIcon />
                }
              />
              <WriterInfo>
                <WriterName>{tweetObj.displayName}</WriterName>
                <WriterEmail>{tweetObj.email}</WriterEmail>
                <WriterCreatedAt>
                  {getDatetoString(tweetObj.createdTime)}
                </WriterCreatedAt>
                <CheckIcon type="submit" onClick={onSubmit} />
                <BackspaceIcon type="button" onClick={onCancelEdit} />
              </WriterInfo>

              <EditTextbox
                type="text"
                value={newTweet}
                onChange={onChange}
                maxlength="150"
              ></EditTextbox>
            </>
          )}
        </>
      ) : (
        <>
          <WriterImg
            src={tweetObj.creatorImg ? tweetObj.creatorImg : <PersonIcon />}
          />
          <PostedTweet>
            <WriterInfo>
              <WriterName>{tweetObj.displayName}</WriterName>
              <WriterEmail>{tweetObj.email}</WriterEmail>
              <WriterCreatedAt>
                {getDatetoString(tweetObj.createdTime)}
              </WriterCreatedAt>
            </WriterInfo>
            {isOwner && (
              <>
                <DeleteIcon onClick={onDeleteClick}>Delete</DeleteIcon>
                <ModeEditIcon onClick={toggleEditing}>Edit</ModeEditIcon>
              </>
            )}

            <TweetText onClick={isOwner && toggleEditing}>
              {tweetObj.text}
            </TweetText>
            {tweetObj.attachmentUrl && (
              <TweetImg
                src={tweetObj.attachmentUrl}
                alt={tweetObj.text}
                width="50px"
                height="50px"
              />
            )}
            <IconContainer>
              <StyledIcon>
                <RepeatIcon />
              </StyledIcon>
              <StyledIcon>
                <BookmarkIcon />
              </StyledIcon>
              <StyledIcon>
                <ChatBubbleIcon />
              </StyledIcon>
            </IconContainer>
          </PostedTweet>
        </>
      )}
    </PostedTweetContainer>
  );
}

const EditTextbox = styled.textarea`
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  border: none;
  outline: none;s
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  margin-top: 7px;
  color: black;
  border-radius: 5px;
  resize: none;
  background-color: lightgray;
`;
const PostedTweetContainer = styled.div`
  display: flex;
  padding: 10px 17px;
`;
const PostedTweet = styled.div`
  width: 100%;
`;
const WriterImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  margin-right: 17px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;
const WriterName = styled.h2`
  font-size: 17px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const WriterEmail = styled.h3`
  font-size: 16px;
  margin-left: 7px;
  color: gray;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const WriterCreatedAt = styled.h4`
  font-size: 14px;
  color: gray;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const PostingEditDelete = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;
const TweetText = styled.div``;
const TweetImg = styled.img``;
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
