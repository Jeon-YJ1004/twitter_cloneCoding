import { React, useState, useEffect } from "react";
import styled from "styled-components";

import RegisterForm from "components/form/RegisterForm";
import LoginForm from "components/form/LoginForm";

function Auth({}) {
  const [isLoginForm, setIsLoginForm] = useState(true);

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 580px;
  z-index: 10;
  background-color: white;
  border-radius: 20px;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
  };
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
