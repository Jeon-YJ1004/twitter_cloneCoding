import React, { useEffect, useRef, useState } from "react";
import { authService, dbService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
function UpdateProfileForm({
  updateModal,
  updateModalOpen,
  updateModalClose,
  userObj,
}) {
  const [info, setInfo] = useState({
    displayName: userObj.displayName,
    email: userObj.email,
    photoURL: userObj.photoURL,
    // description: userObj.description,
  });
  const fileRef = useRef();
  // const bgRef = useRef();
  const [attachment, setAttachment] = useState(userObj.photoURL);
  const textareaRef = useRef();
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    setInfo({
      displayName: userObj.displayName,
      email: userObj.email,
      photoURL: userObj.photoURL,
    });
  }, [updateModal, userObj]);

  useEffect(() => {
    setAttachment(userObj.photoURL);
  }, [userObj.photoURL]);
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };
  const onChangeName = (e) => {
    setInfo({ displayName: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateModalClose();
    updateComplete();
    await updateDoc(doc(dbService, "users", userObj.uid), {
      displayName: info.displayName,
      photoURL: attachment === "" ? <PersonIcon /> : attachment,
    });
    // if (userObj.displayName !== newDisplayName) {
    //   await userObj.updateProfile({ displayName: newDisplayName });
    //   refreshUser();
    // }
  };
  const updateComplete = () => setAlert(true);
  const updateClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };
  return (
    <>
      <Modal open={updateModal} onClose={updateModalClose}>
        <UpdateFormContainer>
          <UpdateForm>
            <Header>
              <HeaderTextDiv>
                <HeaderTextP>Update Profile</HeaderTextP>
              </HeaderTextDiv>
              <BtnDiv>
                <SubmitBtn type="submit" value="save" />
              </BtnDiv>
              <CloseIcon onClick={updateModalClose} />
            </Header>
            <UpdateImgContentDiv>
              <BGUpdateDiv></BGUpdateDiv>
              <Adiv></Adiv>
              <ProfileImgUpdateDiv>
                <ProfileImgDiv>
                  <ProfileImg src={attachment} alt="img" />
                </ProfileImgDiv>
                <ProfileImgUpdateBtn htmlFor="file">
                  <BDiv></BDiv>
                  <CameraImgDiv>
                    <ImageIcon />
                  </CameraImgDiv>
                </ProfileImgUpdateBtn>
              </ProfileImgUpdateDiv>
            </UpdateImgContentDiv>
            <ProfileTextUpdateDiv>
              <NameInputDiv>
                <NameText>Name</NameText>
                <NameInput type="text" required onChange={onChangeName} />
              </NameInputDiv>
            </ProfileTextUpdateDiv>
            <input
              id="file"
              type="file"
              accept="image/*"
              hidden
              onChange={onChangeImage}
            />
          </UpdateForm>
        </UpdateFormContainer>
      </Modal>
      <Snackbar open={alert} autoHideDuration={2000} onClose={updateClose}>
        <Alert severity="success" onClose={updateClose}>
          프로필이 변경되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
}
const UpdateFormContainer = styled.div`
  display: flex;
  position: absolute;
  top: 25%;
  left: 50%;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  background-color: #ffffff;
  transform-origin: center;
  --transform-translate-x: -50%;
  --transform-translate-y: -25%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 66.666667%;
  height: auto;
  border-radius: 1rem;
  border-width: 1px;
  border-color: #ffffff;
  outline: 0;
  user-select: none;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  padding-bottom: 0.25rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const HeaderTextDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderTextP = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
`;
const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SubmitBtn = styled.input`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-right: 0.5rem;
  background-color: #000000;
  font-weight: 700;
  cursor: pointer;
  border-radius: 9999px;
  color: white;
  :hover {
    opacity: 60%;
  }
`;
const UpdateImgContentDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;
const BGUpdateDiv = styled.div`
  position: relative;
  background-color: #ede9fe;
  width: 100%;
  height: 9rem;
`;
const Adiv = styled.div`
  display: flex;
  padding-right: 1rem;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 4rem;
`;
const ProfileImgUpdateDiv = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  width: 7rem;
  height: 7rem;
`;
const ProfileImgDiv = styled.div`
  background-color: #ffffff;
  height: 7rem;
  border-width: 4px;
  border-color: #ffffff;
`;
const ProfileImg = styled.img`
  object-fit: cover;
  width: 7rem;
  height: 100%;
  border-radius: 9999px;
`;
const ProfileImgUpdateBtn = styled.label`
  object-fit: cover;
  position: absolute;
  top: 0;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  cursor: pointer;
`;
const BDiv = styled.div`
  display: flex;
  object-fit: cover;
  background-color: #000000;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  opacity: 0.2;
`;
const CameraImgDiv = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;
const ProfileTextUpdateDiv = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  flex-direction: column;
  width: 100%;
`;
const NameInputDiv = styled.div`
  display: flex;
  position: relative;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 300ms;
  flex-direction: column;
  width: 100%;
  height: 3.5rem;
  border-radius: 0.375rem;
  user-select: none;
`;
const NameText = styled.div`
transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 300ms; 
font-size: 0.75rem;
line-height: 1rem; 
width: 100%; 
height: 1rem; 


s`;
const NameInput = styled.input`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  outline: 0;
`;

export default UpdateProfileForm;
