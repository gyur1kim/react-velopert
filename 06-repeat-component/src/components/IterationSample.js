import React from 'react';

const IterationSample = () => {
  const names = ['눈사람', '얼음', '눈', '바람'];
  // 이 코드는 key값이 없음!
  // const nameList = names.map(name => <li>{name}</li>);

  // 콜백함수의 2번째 인자인 인덱스를 이용해 key값을 넣어주자!
  // 실제로는 index 값을 이용해서 key값을 넣으면 안됨!
  // 배열이 변하면 index도 변하기 때문!!
  const nameList = names.map((name, index) => <li key={index}>{name}</li>)
  return <ul>{nameList}</ul>;
}

export default IterationSample;