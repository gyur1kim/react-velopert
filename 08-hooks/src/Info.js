import React, { useState, useEffect, useReducer } from 'react';

function reducer (state, action) {
  return {
    ...state,
    [action.name] : action.value
  }
}

function Info() {
  // const [name, setName] = useState('');
  // const [nickname, setNickname] = useState('');
  // useEffect(() => {
  //   console.log("렌더링이 완료됐습니다.")
  //   console.log({
  //     name, nickname
  //   })
  // })
  //
  // const onChangeName = e => {
  //   setName(e.target.value);
  // }
  //
  // const onChangeNickname = e => {
  //   setNickname(e.target.value);
  // }

  const [state, dispatch] = useReducer(reducer, {name: '', nickname: ''})
  // 구조분해할당
  const { name, nickname } = state;

  const onChange = e => {
    dispatch(e.target)
  }

  return (
    <div>
      <div>
        <input type="text" value={name} name="name" onChange={onChange}/>
        <input type="text" value={nickname} name="nickname" onChange={onChange}/>
      </div>
      <div>
        <div><b>이름: </b>{name}</div>
        <div><b>닉네임: </b>{nickname}</div>
      </div>
    </div>
  );
}

export default Info;