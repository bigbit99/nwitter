import { authService } from 'fbase';
import React from 'react';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <Wrap>
      <AuthForm />
      <GoogleAuth>
        <button onClick={onSocialClick} name='google'>
          <img src='../../images/google.png' />
        </button>
      </GoogleAuth>
    </Wrap>
  );
};
export default Auth;

const Wrap = styled.div`
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
`;

const GoogleAuth = styled.div`
  margin-top: 40px;
  > button {
    display: block;
    border: 0;
    outline: 0;
    width: 100%;
    max-width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 100%;
    background-color: #6653f5;
    > img {
      width: 100%;
      max-width: 30px;
    }
  }
`;
