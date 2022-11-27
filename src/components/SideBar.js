import React from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Link } from "react-router-dom";
function SideBar({ userObj }) {
  const history = useHistory();

  const toggleProfile = (e) => {};
  const onLogOutModalClick = () => {};
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      {/* <UserContainer>
        <UserInfo>
          {userObj.photoURL ? (
            <UserImg src={userObj.photoURL} />
          ) : (
            <PersonIcon />
          )}
          <UserName>
            {userObj?.displayName ? userObj.displayName : "로그인이 필요합니다"}
          </UserName>
          <MoreHorizIcon onClick={onLogOutModalClick} />
        </UserInfo>
      </UserContainer> */}

      <MenuList>
        <Menu to="/">
          <MenuIcon>
            <HomeIcon />
          </MenuIcon>
          <MenuText>홈</MenuText>
        </Menu>
        <Menu to="/explore">
          <MenuIcon>
            <ExploreIcon />
          </MenuIcon>
          <MenuText>explore</MenuText>
        </Menu>
        <Menu to="/bookmark">
          <MenuIcon>
            <BookmarkIcon />
          </MenuIcon>
          <MenuText>북마크</MenuText>
        </Menu>
        <Menu to="/profile">
          <MenuIcon>
            <AccountBoxIcon />
          </MenuIcon>
          <MenuText>프로필</MenuText>
        </Menu>
        <Menu to="/">
          <MenuIcon>
            <MoreHorizIcon />
          </MenuIcon>
          <MenuText>더보기</MenuText>
        </Menu>
      </MenuList>
      <button onClick={onLogOutClick}>Log out </button>
    </>
  );
}

const MenuList = styled.ul``;
const Menu = styled(Link)`
  margin-bottom: 8px;
  display: inline-block;
  margin-right: 50px;
  align-items: center;
  padding: 12px 15px;
  padding-right: 25px;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
  &:link {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;
const MenuIcon = styled.div`
  width: 30px !important;
  display: inline-block;
  font-size: 24px;
`;
const MenuText = styled.div`
  display: inline-block;
  font-size: 20px;
  margin-left: 20px;
`;
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

export default SideBar;
