import React, { useReducer } from 'react';

// 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT' :
      return { value : state.value + 1 }
    case 'DECREMENT' :
      return { value : state.value - 1}
    default :
      return state
  }
}

function initializer(initialArg) {
  return { value : initialArg }
}

function Counter() {
  // 기존의 useState 작성
  // const [value, setValue] = useState(0);
  //
  // return (
  //   <div>
  //     <p>현재 카운터 값은 <b>{value}</b>입니다</p>
  //     <button onClick={()=>{setValue(prev => prev+1)}}>+1</button>
  //     <button onClick={()=>{setValue(prev => prev-1)}}>-1</button>
  //   </div>
  // );

  // useReducer 이용하기
  // const [state, dispatch] = useReducer(reducer, { value: 0 })

  // initialize state lazily with an initializer function.
  // This is useful when creating the initial state is computationally expensive.
  const [state, dispatch] = useReducer(reducer, 0, initializer)

  return (
    <div>
      <p>현재 카운터 값은 <b>{state.value}</b>입니다</p>
      <button onClick={()=>{dispatch({ type: 'INCREMENT' })}}>+1</button>
      <button onClick={()=>{dispatch({ type: 'DECREMENT' })}}>-1</button>
    </div>
  );
}

export default Counter;