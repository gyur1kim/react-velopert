## 11.3 느려지는 원인 분석

**리렌더링**은 언제 발생할까?

1. 자신이 전달받은 **props**가 변할 때
2. 자신의 **state**가 바뀔 때
3. **부모 컴포넌트**가 리렌더링될 때
4. **forceUpdate 함수**가 실행될 때

`예제`에서는….

- App 컴포넌트의 **state가 바뀜** (todos 중 하나를 checked로 변경)

  ⇒ App컴포넌트(**부모 컴포넌트**)가 변경되므로 TodoList(**자식 컴포넌트**)도 **변경**됨

  ⇒ 딱 한 개만 변경했지만, 자식 컴포넌트 1부터 2500까지 **전부 리렌더링**됨


## 11.4 React.memo를 사용하여 컴포넌트 성능 최적화

- 클래스형 컴포넌트 : `shouldComponentUpdate`
- 함수형 컴포넌트 : `React.memo`

컴포넌트의 `props`가 변하지 않았다면, 리렌더링 하지 않도록 설정

## 11.5 함수가 바뀌지 않게 하기

- 함수가 계속 만들어지는 것을 방지하는 방법
  - `useState`의 **함수형 업데이트** 기능을 사용하기
  - `useReducer`를 사용하기

### useState의 함수형 업데이트

- setTodos를 사용할 때 새로운 상태를 넣는 것이 아닌, 상태를 **어떻게 업데이트** 해줄지 정의해주는 **업데이트 함수**
- == **함수형 업데이트**

### useReducer 사용하기

- reducer 생성
  - state, action으로 인자를 받음

    ```jsx
    function todoReducer(todos, action) {
      switch (action.type) {
        case "INSERT":
          return todos.concat(action.todo);
        case "REMOVE":
          return todos.filter(todo => todo.id !== action.id)
        case "TOGGLE":
          return todos.map(todo => todo.id === action.id? {...todo, checked: !todo.checked } : todo);
        default:
          return todos;
      }
    ```

- `useReducer()`
  - [값, 값을 변경할 때 사용할 함수]
  - `useReducer(리듀서 함수, 초기값, 초기값)`
    - **세 번째 인자**에 함수를 넣었는데, 이렇게 하면 컴포넌트가 **처음 렌더링될 때만** 함수가 **호출**된다.

    ```jsx
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
    ```

- 함수 생성

    ```jsx
    const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      };
      dispatch({ type: "INSERT", todo });
      nextId.current++;
    }, [todos]);
    const onRemove = useCallback(id => {
      dispatch({ type: "REMOVE", id })
    }, [todos]);
    
    const onToggle = useCallback(id => {
      dispatch({type: "TOGGLE", id })
    }, [todos])
    ```