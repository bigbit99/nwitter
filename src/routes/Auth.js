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
      <WrapCont>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/paper-plane.png'} />
          <p>Create an Account</p>
          <AuthForm />
          <GoogleAuth>
            <button onClick={onSocialClick} name='google'>
              <img src={process.env.PUBLIC_URL + '/images/google-plus.png'} />
            </button>
          </GoogleAuth>
        </div>
        <div>
          <ImgBox>
            <img src={process.env.PUBLIC_URL + '/images/mainmood.png'} />
            <dl>
              <dt>어서오세요.</dt>
              <dd>
                더 많은 기능을 즐겨보세요.
                <br />
                다양한 사람들과 즐거움이 기다리고 있습니다.
              </dd>
            </dl>
          </ImgBox>
        </div>
      </WrapCont>
    </Wrap>
  );
};
export default Auth;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapCont = styled.div`
  width: 100%;
  max-width: 90%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 15px;
  border-radius: 20px;
  > div:nth-child(1) {
    width: 45%;
    text-align: center;
    box-sizing: border-box;
    > img {
      width: 30px;
      display: block;
      margin: 0 auto;
    }
    > p {
      font-size: 1.4em;
      font-weight: bold;
    }
  }
  > div:nth-child(2) {
    width: 45%;
    padding: 40px 0;
  }
`;

const ImgBox = styled.div`
  border-radius: 15px;
  overflow: hidden;
  max-width: 500px;
  position: relative;
  margin: 0 auto;
  > img {
    width: 100%;
    display: block;
  }
  > dl {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    dt {
      font-size: 1.4em;
      font-weight: 600;
    }
    dd {
      margin-top: 5px;
      font-weight: 300;
    }
  }
`;
const GoogleAuth = styled.div`
  margin-top: 40px;
  > button {
    display: block;
    border: 0;
    outline: 0;
    width: 100%;
    max-width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 100%;
    background-color: #fff;
    border: 1px solid #bc413b;
    position: relative;
    > img {
      width: 100%;
      max-width: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
