import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link } from "react-router-dom";
function SideBar({ userObj }) {
  const toggleProfile = (e) => {};
  const onLogOutModalClick = () => {};

  return (
    <>
      <UserContainer>
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
      </UserContainer>
      <MenuContainer>
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
          <MenuIcon></MenuIcon>
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
      </MenuContainer>
    </>
  );
}

const MenuContainer = styled.div`
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  padding-right: 20px;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 15px;
  border-right: 1px solid
    ${(props) => (props.current === "true" ? "#1e2125" : "#eee")};
`;
const Menu = styled(Link)``;
const MenuIcon = styled.div``;
const MenuText = styled.div``;
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
