// 새로운 항목을 입력하고 추가할 수 있는 컴포넌트
// state를 통해 인풋의 상태를 관리함

import React from 'react';
import { MdAdd } from 'react-icons/md';
import '../style/TodoInsert.scss'

function TodoInsert() {
  return (
    <form className="TodoInsert">
      <input type="text" placeholder="할 일을 입력하세요" />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
}

export default TodoInsert;