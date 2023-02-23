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
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type='text'
                  placeholder='수정할 내용을 입력해주세요'
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type='submit' value='Update Nweet' />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width='50px' height='50px' />
          )}
          {isOwner && (
            <BtnWrap>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </BtnWrap>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;

const BtnWrap = styled.div`
  > button {
    border: 0;
    outline: 0;
  }
`;
