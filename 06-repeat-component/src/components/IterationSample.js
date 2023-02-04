import React, { useState } from 'react';

const IterationSample = () => {
  // const names = ['눈사람', '얼음', '눈', '바람'];

  // 이 코드는 key값이 없음!
  // const nameList = names.map(name => <li>{name}</li>);

  // 콜백함수의 2번째 인자인 인덱스를 이용해 key값을 넣어주자!
  // 실제로는 index 값을 이용해서 key값을 넣으면 안됨!
  // 배열이 변하면 index도 변하기 때문!!
  // const nameList = names.map((name, index) => <li key={index}>{name}</li>)

  const [names, setNames] = useState([
    {
      id: 1,
      text: '눈사람'
    },
    {
      id: 2,
      text: '얼음'
    },
    {
      id: 3,
      text: '눈'
    },
    {
      id: 4,
      text: '바람'
    },
  ])
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText
    });
    setNextId(prev => prev+1);
    setNames(nextNames);
    setInputText('');
  }

  const onRemove = (id) => {
    const nextNames = names.filter(name => name.id !== id);
    setNames(nextNames);
  }

  const nameList = names.map((name, index) => <li key={name.id} onDoubleClick={()=>{onRemove(name.id)}}>{name.text}</li>)
  return (
    <>
      <input type="text" value={inputText} onChange={onChange}/>
      <button onClick={onClick}>추가하기</button>
      <ul>{nameList}</ul>
    </>
  );
}

export default IterationSample;