import {React , useState, useRef,useCallback,useEffect } from "react";
import { dbService, storageService } from "../../fbase";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import EmojiPicker from "emoji-picker-react";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoIcon from "@mui/icons-material/Photo";
import MoodIcon from "@mui/icons-material/Mood";
import PersonIcon from "@mui/icons-material/Person";

function TweetForm() {
  const dispatch = useDispatch();
  const currentUserObj=useSelector(state=>state.user.currentUser)
  const loginToken=useSelector(state=>state.loginToken);
  const [tweet, setTweet] = useState("");
  const textRef=useRef();
  const [attachment, setAttachment] = useState("");
  const fileRef = useRef();
  const [fileName, setFileName] = useState("");

  const [Emoji, setEmoji] = useState(false);
  const emojiRef = useRef();
	const [emojiClick, setEmojiClick] = useState(false);
  const toggleEmoji = () => {
		if (emojiClick) {
			setEmojiClick(false);
		} else {
			setEmojiClick(true);
			textRef.current.focus();
		}
	};
  const onEmojiInput = (event, emojiObject) => {
    const beforeEmojiText = textRef.current.value;
    const inputValue = beforeEmojiText + emojiObject.emoji;
    setTweet(inputValue);
  };
  useEffect(() => {
		if (!emojiClick) return;
		function handleClick(e) {
			if (emojiRef.current === null) {
				return;
			} else if (!emojiRef.current.contains(e.target)) {
				setEmojiClick(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [emojiClick]);


  // 트윗 submit
  const onSubmit = async (event) => {
    event.preventDefault();
    if (loginToken==="logout") {
      alert("NotLogin");
      return;
    }
    let attachmentUrl = "";

    if (tweet === "" && attachment === "") {
      alert("사진이나 글이 필요합니다");
    }else{
      const randomId = uuidv4();
      if (attachment !== "") {
      //파일 업로드 시 저장될 ref 경로 생성. 파일을 버킷에 업로드
      const fileRef = storageService.ref().child(`${currentUserObj.uid}/${randomId}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdTime: Date.now(),
      creatorId: currentUserObj.uid,
      randomId: randomId,
      like: [],
      reply: [],
      retweet: [],
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setEmoji(false);
    setAttachment("");
    }
    
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
    //파일 이름이 같을 수 있기때문에 뒤에 시간을 붙여서 구별
    reader.readAsDataURL(theFile);
    setFileName(`${uploadFileName}_${Date.now()}`);
  };

  const onClearFileClick = () => {
    setAttachment(null);
    fileRef.current.value = null;
  };
  
  return (
    <>
    {currentUserObj.photoURL ? (
      <UserImg src={currentUserObj.photoURL} />
        ) : (
          <PersonIcon />
        )}
      <FormContainer onSubmit={onSubmit}>
        <FormTextInput
          type="text"
          value={tweet}
          ref={textRef}
          onChange={onTextChange}
          placeholder="what's on your mind"
          maxLength={100}
          
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
            <button onClick={onClearFileClick}>
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
          {/* <StyledIcon ref={emojiRef}>
            <MoodIcon onClick={toggleEmoji}/>
            <EmojiToggleDiv hide={!emojiClick}>
              <EmojiPicker onEmojiClick={onEmojiInput} />
            </EmojiToggleDiv>
           
          </StyledIcon> */}
          <FormSumbitInput type="submit" value="Tweet" />
        </IconContainer>
      </FormContainer>
    </>
  );
}
const UserImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 50%;
`;
const FormContainer = styled.form`
  position: relative;
`;
const FormTextInput = styled.textarea`
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
const EmojiToggleDiv=styled.div`
  ${(props)=>props.hide && `display: none;`}
`
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
