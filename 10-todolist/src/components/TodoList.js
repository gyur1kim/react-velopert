// todos 배열을 props로 받아온다.
// 이를 map 함수를 통해 여러 개의 TodoListItem 컴포넌트로 변환하여 보여준다.

import React from 'react';
import TodoListItem from "./TodoListItem";
import '../style/TodoList.scss'

function TodoList() {
  return (
    <div className="TodoList">
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </div>
  );
}

export default TodoList;