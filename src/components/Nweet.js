import React, { useState } from 'react';
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import styled from 'styled-components';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  //리터럴
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm('정말 nweet을 삭제하시겠습니까?');
    if (ok) {
      await deleteDoc(NweetTextRef);
      await deleteObject(ref(dbService, nweetObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <Wrap>
      {editing ? (
        <>
          {isOwner && (
            <>
              <EditForm onSubmit={onSubmit}>
                <EditInput
                  type='text'
                  placeholder='수정할 내용을 입력해주세요'
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <EditBtnWrap>
                  <button type='submit'>Update</button>
                  <button onClick={toggleEditing}>Cancle</button>
                </EditBtnWrap>
              </EditForm>
            </>
          )}
        </>
      ) : (
        <NweetBox>
          <NweetText>{nweetObj.text}</NweetText>
          {nweetObj.attachmentUrl && (
            <NweetImg src={nweetObj.attachmentUrl} width='100%' height='auto' />
          )}
          {isOwner && (
            <BtnWrap>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </BtnWrap>
          )}
        </NweetBox>
      )}
    </Wrap>
  );
};

export default Nweet;
const Wrap = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
`;
const BtnWrap = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  gap: 10px;
  > button {
    width: 80px;
    border: 0;
    outline: 0;
    background-color: #9897ea;
    color: #fff;
    padding: 5px;
    border-radius: 15px;
    box-sizing: border-box;
    border: 1px solid #fff;
    margin-top: 15px;
  }
  > button:nth-child(1) {
  }
  > button:nth-child(2) {
  }
`;

const NweetBox = styled.div`
  padding: 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #fff;
  border-radius: 15px;
`;

const NweetText = styled.p`
  margin-bottom: 10px;
`;

const NweetImg = styled.img`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const EditForm = styled.form``;
const EditInput = styled.input`
  border: 0;
  outline: 0;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 30px;
  color: #444;
`;
const EditBtnWrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  > button {
    width: 20%;
    padding: 3px 0;
    border-radius: 15px;
    border: 0;
    outline: 0;
    background: #9897ea;
    color: #fff;

    border: 1px solid #fff;
  }
`;
