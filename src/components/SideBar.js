import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";

import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function SideBar({ userObj }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);

  const onClickProfile=()=>{
    alert("로그인이 필요합니다.")
  }
  useEffect(() => {
		return () => setLoading(false); 
	}, []);
  return (
    <>
    <StyledDiv>
      <MenuList>
        <Menu>
        <StyledLink to="/">
          <MenuIcon>
            <HomeIcon />
          </MenuIcon>
          <MenuText>홈</MenuText>
        </StyledLink>
        </Menu>
        <Menu>
        <StyledLink to="/explore">
          <MenuIcon>
            <ExploreIcon />
          </MenuIcon>
          <MenuText>explore</MenuText>
        </StyledLink>
        </Menu>
        <Menu>
        <StyledLink to={{pathname:`/bookmark`, state:{data:"data"}}}>
          <MenuIcon>
            <BookmarkIcon />
          </MenuIcon>
          <MenuText>북마크</MenuText>
        </StyledLink>
        </Menu>
        <Menu>
          {currentUser.uid ?
          <>
            <StyledLink to={{pathname:`/profile/${currentUser.uid}/tweets`}}>
            <MenuIcon>
              <AccountBoxIcon />
            </MenuIcon>
            <MenuText>프로필</MenuText>
          </StyledLink>
          </> :
          <StyledLink onClick={onClickProfile} to="/">
          <MenuIcon>
            <AccountBoxIcon />
          </MenuIcon>
          <MenuText>프로필</MenuText>
        </StyledLink>
          }
        
        </Menu>
        <Menu>
        <StyledLink to="/">
          <MenuIcon>
            <MoreHorizIcon />
          </MenuIcon>
          <MenuText>더보기</MenuText>
        </StyledLink>
        </Menu>
      </MenuList>
    </StyledDiv>
      
     
    </>
  );
}
const StyledDiv=styled.div`
display: flex; 
position: fixed; 
padding-top: 1rem; 
padding-right: 1rem; 
flex-direction: column; 
justify-content: space-between; 
width: 16rem; 
height: 100%; 
border-right-width: 1px; 
border-color: #E5E7EB; 
user-select: none; 
`
const MenuList = styled.div`
display: flex; 
flex-direction: column; 
width: 100%; 
`
const Menu=styled.div`
display: flex; 
flex-direction: row; 
align-items: center; 
width: auto; 
`

const StyledLink = styled(Link)`
display: flex; 
padding-top: 0.75rem;
padding-bottom: 0.75rem; 
padding-left: 0.75rem; 
padding-right: 1.25rem; 
margin-bottom: 0.5rem; 
transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; 
transition-duration: 300ms; 
font-size: 1.25rem;
line-height: 1.75rem; 
flex-direction: row; 
border-radius: 9999px; 

:hover {
 background-color: #E5E7EB; 
 }
  
`;
const MenuIcon = styled.div`
margin-right: 1rem; 
`;
const MenuText = styled.div`
`;

export default SideBar;
