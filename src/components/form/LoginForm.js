import React from "react";
import styled from "styled-components";
import { authService, firebaseInstance , dbService} from "fbase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoginToken } from "reducers/userApi";

// import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import google_logo from "images/google_logo.svg";
import kakaotalk_logo from "images/kakaotalk_logo.svg";
import bgimg from "images/backgroundImg.jpg"

function LoginForm({ isLoginForm }) {
  const dispatch = useDispatch();
  const onSocialLoginClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    let user;
    try {
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider)
      .then((result)=>{
          // This is the signed-in user
          user = result.user;
          console.log(user)

          const docRef = doc(dbService, "users", user.uid);
          getDoc(docRef).then(async (snap) => {
            if (snap.exists()) {
              await dispatch(setLoginToken("login"));
              await dispatch(
                setCurrentUser({
                  ...snap.data(),
                  uid: user.uid,
                  rejweet: user.rejweet ? user.rejweet : [],
                })
              );
              sessionStorage.setItem("loginToken", true);
            } else {
              console.log("회원정보 없음");
              await dispatch(setLoginToken("login"));
              await dispatch(
                setCurrentUser({
                  uid: user.uid,
                  photoURL: user.photoURL,
                  email: user.email,
                  displayName: user.displayName,
                  description: "",
                  bookmark: [],
                  rejweet: [],
                  bgURL: user.bgURL ? user.bgURL : bgimg,
                })
              );
              const usersRef = await collection(dbService, "users");
              await setDoc(doc(usersRef, user.uid), {
                photoURL: user.photoURL,
                email: user.email,
                displayName:
                  user.displayName === ""
                    ? user.email.split("@")[0]
                    : user.displayName,
                bookmark: [],
                rejweet: [],
                description: "",
                bgURL: user.bgURL ? user.bgURL : bgimg,
              });
              sessionStorage.setItem("loginToken", true);
              
            }
          });
      })
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
