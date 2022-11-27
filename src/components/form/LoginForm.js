import React from "react";
import styled from "styled-components";
import { authService, firebaseInstance } from "fbase";
import { doc, setDoc } from "firebase/firestore";

// import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import google_logo from "images/google_logo.svg";
import kakaotalk_logo from "images/kakaotalk_logo.svg";
function LoginForm({ isLoginForm }) {
  const onSocialLoginClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <LoginHeader> {isLoginForm ? "로그인" : "가입하기"}</LoginHeader>
      <LoginContaienr>
        <SocialLoginBtn name="google" onClick={onSocialLoginClick}>
          <LoginLogo src={google_logo} />{" "}
          {isLoginForm ? "google 로그인" : "google로 가입하기"}
        </SocialLoginBtn>
        <SocialLoginBtn name="github" onClick={onSocialLoginClick}>
          <GitHubIcon /> {isLoginForm ? "github 로그인" : "github로 가입하기"}
        </SocialLoginBtn>
        <SocialLoginBtn name="kakao">
          <LoginLogo src={kakaotalk_logo} width="25px" />{" "}
          {isLoginForm ? "kakao 로그인" : "kakao로 가입하기"}
        </SocialLoginBtn>
      </LoginContaienr>
    </>
  );
}
const LoginContaienr = styled.div``;
const LoginHeader = styled.div``;

const LoginLogo = styled.img`
  // width: 18px;
  margin-right: 5px;
  margin-bottom: 1px;
`;
const SocialLoginBtn = styled.button` 
border: none;
outline: none;
cursor: pointer;
padding: 10px 12px;
color: black;
border-radius: 30px;
font-size: 13px;
font-weight: bold;
background-color: white;
margin-right: 5px;
&:hover {
  background-color: lightgray;
}s`;

export default LoginForm;
