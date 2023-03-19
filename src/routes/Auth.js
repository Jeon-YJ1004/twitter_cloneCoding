import { React, useState, useEffect } from "react";
import styled from "styled-components";

import RegisterForm from "components/form/RegisterForm";
import LoginForm from "components/form/LoginForm";

function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  // const onLoginClick = () => {};
  // const onRegisterClick = () => {};
  // const onLogoutClick = () => {};
  const changeAuthForm = (e) => {
    setIsLoginForm((current) => !current);
  };
  return (
    <>
      <AuthFormContainer>
        {isLoginForm ? (
          <>
            <LoginForm isLoginForm={isLoginForm} />
            <ChangeFormContainer>
              계정이 없으신가요?
              <ChangeFormBtn onClick={changeAuthForm}>가입하기</ChangeFormBtn>
            </ChangeFormContainer>
          </>
        ) : (
          <>
            <LoginForm isLoginForm={isLoginForm} />
            <ChangeFormContainer>
              아이디가 있으세요?
              <ChangeFormBtn onClick={changeAuthForm}>로그인하기</ChangeFormBtn>
            </ChangeFormContainer>
          </>
        )}
      </AuthFormContainer>
    </>
  );
}
const AuthFormContainer = styled.div`
display: flex; 
position: absolute; 
top: 50%; 
left: 50%; 
padding: 2rem; 
background-color: #ffffff; 
transform-origin: center; 
--transform-translate-x: -50%; 
--transform-translate-y: -50%; 
flex-direction: column; 
justify-content: flex-start; 
align-items: flex-start; 
width: 24rem; 
height: auto; 
border-radius: 1rem; 
border-width: 1px; 
border-color: #ffffff; 
outline: 0; 

`;
const ChangeFormContainer = styled.div``;
const ChangeFormBtn = styled.button`
  color: red;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
export default Auth;
