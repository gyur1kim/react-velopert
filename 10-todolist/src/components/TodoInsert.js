// 새로운 항목을 입력하고 추가할 수 있는 컴포넌트
// state를 통해 인풋의 상태를 관리함

import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import '../style/TodoInsert.scss'

function TodoInsert() {
  const [value, setValue] = useState('');

  // useCallback을 사용하는 이유는?
  // 값이 변할 때마다 재렌더링됨 -> 함수도 새롭게 만들어짐
  // 함수가 새롭게 만들어지는 것을 방지하기 위해 useCallback을 이용한다(함수를 재사용할 수 있게 됨)
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return (
    <form className="TodoInsert">
      <input type="text" placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
}

export default TodoInsert;