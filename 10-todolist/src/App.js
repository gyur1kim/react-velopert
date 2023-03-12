import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기 알아보기',
      checked: true
    },
    {
      id: 3,
      text: '일정관리 앱 만들어보기',
      checked: false
    }
  ]);

  // useRef를 이용해 id를 나타내는 이유
  // useState는 값이 변하면 재렌더링됨
  // 하지만 id가 하나 는다고 해서 굳이 컴포넌트를 재렌더링 할 필요는 없기 때문
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    setTodos(todos.concat(todo));
    nextId.current++;
  }, [todos]);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default App;
