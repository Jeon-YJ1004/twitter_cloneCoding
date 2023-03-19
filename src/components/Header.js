import React, { useEffect, useState } from "react";
import {
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoginToken } from "reducers/userApi";
import { authService } from "fbase";
import PersonIcon from "@mui/icons-material/Person";
import styled from 'styled-components';
import Modal from "@mui/material/Modal";
import Auth from 'routes/Auth';
function Header(props) {
  const locationName=props.locationName;
  const history = useHistory();
  const dispatch = useDispatch();

  const loginToken = useSelector((state) => state.user.loginToken);
  const currentUser = useSelector((state) => state.user.currentUser);

  //login modal
  
	const [logInOpen, setLogInOpen] = useState(false);
	const handleLogInOpen = () => setLogInOpen(true);
	const handleLogInClose = () => setLogInOpen(false);

	const [logoutOpen, setLogoutOpen] = useState(false);
	const handleLogoutOpen = () => setLogoutOpen(true);
	const handleLogoutClose = () => setLogoutOpen(false);
  
  const onClickLogOut = () => {
      authService.signOut();
      sessionStorage.setItem("loginToken", false);
      dispatch(setLoginToken("logout"));
      dispatch(
        setCurrentUser({
          uid: "",
          email: "",
          photoURL: "",
          displayName: "",
          bookmark: [],
          retweet: [],
          bgURL: "",
        })
      );
      history.push("/");
    };
  return (
    <>
    <StyledDiv>
      <Title>{locationName}</Title>
        {loginToken === "login" && currentUser ? (  
        <UserContainer>
        <UserInfo>
          {currentUser.photoURL ? (
            <UserImg src={currentUser.photoURL} />
          ) : (
            <PersonIcon />
          )}
          <UserName>
            {currentUser.displayName}
          </UserName>
          <ToggleLoginDiv >
            <LoginBtn onClick={handleLogoutOpen}>Log Out</LoginBtn>
            <Modal open={logoutOpen} onClose={handleLogoutClose} aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
            <div>
              <LoginBtn onClick={onClickLogOut}>
						Log out
					</LoginBtn>
					<LoginBtn onClick={handleLogoutClose}>
						Cancel
					</LoginBtn>
            </div>
            
            </Modal>
        </ToggleLoginDiv>
        </UserInfo>
      </UserContainer>
      ) : (
        <ToggleLoginDiv >
          <LoginBtn onClick={handleLogInOpen}>log In</LoginBtn>
          <Modal open={logInOpen} onClose={handleLogInClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <div>
              <Auth /> 
            </div>
            
          </Modal>
          
        </ToggleLoginDiv>
      )}
    </StyledDiv>
    </>
  )
}

const StyledDiv=styled.div`
display: flex; 
padding-top: 0.5rem;
padding-bottom: 0.5rem; 
padding-left: 1rem;
padding-right: 1rem; 
font-size: 1.25rem;
line-height: 1.75rem; 
font-weight: 700; 
justify-content: space-between; 
align-items: center; 
border-bottom-width: 1px; 
border-color: #E5E7EB; 
`
const Title=styled.h1`
cursor: pointer; 
`
const UserContainer = styled.div``;
const UserInfo = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;
const UserName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
`;
const UserImg = styled.img`
  flex: 1;
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

const ToggleLoginDiv =styled.div`
// display: flex; 
// position: absolute; 
// top: 50%; 
// left: 50%; 
// padding: 2rem; 
// background-color: #ffffff; 
// transform-origin: center; 
// --transform-translate-x: -50%; 
// --transform-translate-y: -50%; 
// flex-direction: column; 
// justify-content: flex-start; 
// align-items: flex-start; 
// width: 24rem; 
// height: auto; 
// border-radius: 1rem; 
// border-width: 1px; 
// border-color: #ffffff; 
// outline: 0; 
`
const LoginBtn=styled.button`
display: flex; 
padding-top: 0.75rem;
padding-bottom: 0.75rem; 
margin-bottom: 1rem; 
background-color: #C4B5FD; 
color: #ffffff; 
font-weight: 700; 
justify-content: center; 
align-items: center; 
width: 100%; 
border:none;
border-radius: 100px; 
cursor: pointer; 

`
export default Header