import React, { useState, useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import { updateProfile } from '@firebase/auth';
import styled from 'styled-components';

const Profiles = ({ refreshUser, userObj, newName }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
    navigate('/');
  };

  return (
    <Wrap>
      <ProfileForm onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Display name'
          onChange={onChange}
          value={newDisplayName}
        />
        <input type='submit' value='Update' />
      </ProfileForm>
      <LogoutBtn onClick={onLogOutClick}>Log Out</LogoutBtn>
    </Wrap>
  );
};

export default Profiles;
const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
`;

const ProfileForm = styled.form`
  margin-top: 20px;
  > input:nth-child(1) {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid #fff;
    padding: 5px 10px;
    border-radius: 15px;
    outline: 0;
    box-sizing: border-box;
  }
  > input:nth-child(2) {
    outline: 0;
    border: 1px solid #fff;
    width: 100px;
    display: block;
    margin-top: 10px;
    margin-left: auto;
    padding: 3px 0;
    border-radius: 15px;
    background-color: #9897ea;
    color: #fff;
  }
`;

const LogoutBtn = styled.button`
  position: absolute;
  bottom: 0;
  background-color: #9897ea;
  border: 0;
  outline: 0;
  padding: 5px 0;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 15px;
`;
