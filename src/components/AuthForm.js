import React, { useState } from 'react';
import styled from 'styled-components';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { authService } from 'fbase';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;

      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message.replace('Firebase:', ''));
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <InputBox>
          <label>E-mail</label>
          <EmailInput
            onChange={onChange}
            name='email'
            type='email'
            placeholder='email'
            required
            value={email}
          />
          <label>Password</label>
          <input
            onChange={onChange}
            name='password'
            type='password'
            placeholder='password'
            required
            value={password}
          />
        </InputBox>
        <AuthBtn
          className='authbtn'
          type='submit'
          value={newAccount ? 'Sign In' : 'Log In'}
        />
        {error}
        <ToggleBtn onClick={toggleAccount}>
          {newAccount ? 'Log in' : 'Sign In'}
        </ToggleBtn>
      </Form>
    </>
  );
};

export default AuthForm;

const Form = styled.form`
  margin-top: 30px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const InputBox = styled.div`
  > label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  > input {
    display: block;
    width: 100%;
    padding: 10px 0 10px 10px;
    border: 0;
    outline: 0;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }
`;

const EmailInput = styled.input`
  margin-bottom: 30px;
`;

const AuthBtn = styled.input`
  border: 0;
  outline: 0;
  background-color: #9897ea;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 5px;
  border-radius: 30px;
  color: #fff;
  font-size: 1em;
  width: 100px;
  margin-left: auto;
  display: block;
`;

const ToggleBtn = styled.span`
  display: block;
  margin-top: 10px;
  color: #706a9c;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  margin-bottom: 3px;
`;
