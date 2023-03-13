import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import styled from 'styled-components';
import Navigation from 'components/Navigation';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';

    if (attachment !== '') {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

      const uploadFile = await uploadString(fileRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet('');
    setAttachment('');

    // try {
    //   const doc,Ref = await addDoc(collection(dbService, 'nweets'), {
    //     text: nweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    // } catch (e) {
    //   console.error('Error adding document:', e);
    // }
    //setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event; //'event'로부터 라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라는 뜻.
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event; //event안에서 target 안으로 가서 파일을 받아온다는 것을 의미함.
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent; //'finishedEvent'로 부터 라는 의미. 즉, finishedEvent 안에 있는 currentTarget 있는 reuslt를 달라는 뜻.
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment('');
  return (
    <div>
      <Navigation userObj={userObj} />
      <Form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {attachment && (
          <AttachBox>
            <ClearBtn onClick={onClearAttachment}>X</ClearBtn>
            <AttachImg
              src={attachment}
              width='100%'
              max-width='500px'
              height='atuo'
            />
          </AttachBox>
        )}
        <FormBtnBox>
          <ImageBox>
            <input
              type='file'
              accept='image/*'
              id='ex_file'
              onChange={onFileChange}
            />

            <label htmlFor='ex_file'>
              <img src='./images/photo_icon.png' />
            </label>
          </ImageBox>
          <NweetInput type='submit' value='Nweet' />
        </FormBtnBox>
      </Form>
    </div>
  );
};

export default NweetFactory;

const Form = styled.form`
  margin-top: 20px;
  box-sizing: border-box;
  > input:nth-child(1) {
    border: 0;
    outline: 0;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #fff;
  }
`;

const FormBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ImageBox = styled.div`
  > input:nth-child(1) {
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  > label {
    display: block;
    margin-left: auto;
    width: 20px;
    height: 20px;
    text-align: center;
    background-color: transparent;
    color: #fff;
    padding: 5px 0;
    border-radius: 30px;
    line-height: -4px;
    font-size: 0.9rem;
  }
`;

const AttachBox = styled.div`
  border-radius: 15px;
  border: 1px solid #fff;
  overflow: hidden;
  position: relative;
  margin-top: 15px;
  box-sizing: border-box;
`;

const ClearBtn = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  display: block;
  border: 0;
  outline: 0;
  text-align: center;
  background-color: #9897ea;
  color: #fff;
  border: 1px solid #fff;
  padding: 3px 0;
  width: 35px;
  height: 35px;
  border-radius: 100%;
`;

const AttachImg = styled.img`
  display: block;
  width: 100%;
`;

const NweetInput = styled.input`
  border: 0;
  outline: 0;
  width: 100px;
  height: 30px;
  margin-top: 18px;
  text-align: center;
  background-color: #9897ea;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 30px;
  line-height: -4px;
  font-size: 0.9rem;
`;
