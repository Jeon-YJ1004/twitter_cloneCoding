import React, { useEffect } from "react";
import {
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoginToken } from "reducers/userApi";
import { authService } from "fbase";
import PersonIcon from "@mui/icons-material/Person";
import styled from 'styled-components';
function Header(props) {
  const locationName=props.locationName;
  const history = useHistory();
  const dispatch = useDispatch();

  const loginToken = useSelector((state) => state.user.loginToken);
  const currentUser = useSelector((state) => state.user.currentUser);

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
          <button onClick={onClickLogOut} >로그아웃</button>
        </UserInfo>
      </UserContainer>) : (
        <button >로그인</button>
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
export default Header