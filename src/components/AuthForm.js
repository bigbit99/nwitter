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
          <input
            onChange={onChange}
            name='email'
            type='email'
            placeholder='Email'
            required
            value={email}
          />
          <input
            onChange={onChange}
            name='password'
            type='password'
            placeholder='Password'
            required
            value={password}
          />
        </InputBox>
        <AuthBtn
          className='authbtn'
          type='submit'
          value={newAccount ? 'Create Account' : 'Log In'}
        />
        {error}
      </Form>
      <ToggleBtn onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create Account'}
      </ToggleBtn>
    </>
  );
};

export default AuthForm;

const Form = styled.form``;

const InputBox = styled.div`
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 10px 14px 54px rgba(0, 0, 0, 0.3);
  > input {
    display: block;
    width: 100%;
    padding: 10px 0 10px 10px;
    border: 0;
    outline: 0;
    background-color: transparent;
    margin-bottom: 10px;
  }
  margin-bottom: 30px;
`;

const AuthBtn = styled.input`
  border: 0;
  outline: 0;
  background-color: #6653f5;
  padding: 15px;
  border-radius: 30px;
  color: #fff;
  font-size: 1.1em;
`;

const ToggleBtn = styled.span`
  display: block;
  text-align: right;
  margin-top: 10px;
  color: #6653f5;
  font-weight: bold;
`;
