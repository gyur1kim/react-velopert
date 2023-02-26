import React, { useState, useMemo, useCallback } from 'react';

// 얘한테 useMemo 사용할 거야
const getAverage = numbers => {
  console.log('평균값 계산하는 중...');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, cur) => acc + cur);
  return sum / numbers.length;
}

function Average() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  // deps가 빈 배열 : 컴포넌트가 처음 렌더링될 때만 함수 생성
  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, [])
  // number혹은 list가 바뀌었을 때만 함수 생성
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  }, [list, number])
  // list의 값이 변할 때만 getAverage 함수가 호출됨
  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input type="text" value={number} onChange={onChange} />
      <button onClick={onInsert}>등록하기</button>
      <ul>
        {list.map((val, idx) =>
          <li key={idx}>{val}</li>
        )}
      </ul>
      <div>
        <b>평균값 : </b> {avg}
      </div>
    </div>
  );
}

export default Average;