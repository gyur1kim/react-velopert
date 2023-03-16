import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
  const array = [];
  for (let i=0; i<=2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false
    })
  }

  return array;
}

function App() {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해보기 알아보기',
  //     checked: true
  //   },
  //   {
  //     id: 3,
  //     text: '일정관리 앱 만들어보기',
  //     checked: false
  //   }
  // ]);

  /*
  * 함수를 생성할 때, 함수를 실행한 결과가 아닌 함수 자체를 넣어준다.
  * createBulkTodos() => 리렌더링 될 때마다 함수가 호출됨
  * createBulkTodos   => 컴포넌트가 처음 렌더링될 때만 함수가 실행됨.
  */
  const [todos, setTodos] = useState(createBulkTodos)

  // useRef를 이용해 id를 나타내는 이유
  // useState는 값이 변하면 재렌더링됨
  // 하지만 id가 하나 는다고 해서 굳이 컴포넌트를 재렌더링 할 필요는 없기 때문
  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    setTodos(prev => prev.concat(todo));
    nextId.current++;
  }, [todos]);
  const onRemove = useCallback(id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [todos]);

  const onToggle = useCallback(id => {
    setTodos(prev => prev.map(todo => todo.id === id? {...todo, checked: !todo.checked} : todo))
  }, [todos])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
