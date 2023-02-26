## 8.1 useState

- `const [value, setValue] = useState(0)`
    - useState 함수의 파라미터에는 상태의 기본값을 넣어준다
    - useState 함수는 배열을 반환한다
        - 상태 값
        - 상태를 설정하는 함수 (set ~~)
            - 이 함수에 파라미터를 넣어서 호출하면, 전달받은 파라미터로 값이 바뀌고 컴포넌트가 리렌더링 됨
- useState 함수는 한 개당 하나의 상태 값만 관리할 수 있음


## 8.2 useEffect

- 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- `componentDidMount` + `componentDidUpdate`

    ```jsx
    useEffect(() => { 
      마운트되거나 업데이트 될 때 실행될 내용
    
      // 뒷정리 함수
      return () => {}
    }, [deps])
    ```


### deps : X

- 2번째 파라미터가 없으면, 기본적으로 **렌더링되고 난 직후**마다 실행됨

### deps : []

- deps가 빈 배열이면 **mount될 때**만 실행됨

### deps : [value]

- **deps 안의 값**이 **바뀔 때**만 콜백 함수 실행됨
- 배열 안에는 useState를 통해 관리하고 있는 값을 넣어도 되고, props로 전달받은 값을 넣어도 됨

### 뒷정리 함수 : return

- **언마운트 되기 전**, **업데이트 되기 직전**에 작업을 수행하고 싶을 때 뒷정리 함수 반환
- `뒷정리 함수` + `빈 deps` ⇒ 컴포넌트가 **언마운트 될 때만** 뒷정리 함수 호출


## 8.3 useReducer

- `useState` 보다 더 **다양한 컴포넌트 상황**에 따라 **다양한 상태**를 **다른 값**으로 업데이트 해주고 싶을 때 사용
- **현재 상태**, 업데이트를 위해 필요한 정보를 담은 **액션** ⇒ 새로운 상태를 반환
- 리듀서 함수에서 새로운 상태를 만들 때는 반드시 **불변성 지키기**

    ```jsx
    function reducer(state, action) {
      switch (action.type)
      case ... :  
        return {...}   //불변성을 지키면서 업데이트한 새로운 상태를 반환
    }
    
    ...
    // 첫 번째 파라미터 : 리듀서 함수
    // 두 번째 파라미터 : 해당 리듀서의 기본 값
    // 현재 상태 state와 액션을 발생시키는 함수 dispatch
    const [state, dispatch] = useReducer(reducer, {value : 0})
    ...
    
    // 액션을 발생시키자
    dispatch({ type: '...' })
    ```

    - 리덕스 : 액션 객체에는 반드시 type 필드 필요함
    - useReducer : 액션 객체에 type 필드는 있어도 없어도 됨, 액션 ‘객체’가 아니어도 됨
- 참조 : **3rd argument - initializer**
    - initializer function을 이용하면 초기값을 lazy하게 state할 수 있음
    - initial state가 expensive할 때 사용하면 좋다.
    - `seReducer` allows us to initialize state lazily with an `initializer` function. This is useful when creating the initial state is computationally expensive.

- `input` **상태 관리**하기
    - input 태그에 name 값을 할당하고, `e.target.name` 을 참조하면 됨


## 8.4 useMemo

- 함수형 컴포넌트 내부에서 발생하는 **연산**을 최적화할 수 있음
- 컴포넌트가 재렌더링되면 연산하는 함수도 재호출돼서 불필요한 계산을 반복하게 됨
- **useMemo**
  - 렌더링하는 과정에서 **특정 값**이 바뀌었을 때만 연산을 실행(deps)
  - 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용

```jsx
const getAverage = numbers => {
  console.log('평균값 계산하는 중...');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, cur) => acc + cur);
  return sum / numbers.length;
}

// list의 값이 변할 때만 getAverage 함수가 호출됨
const avg = useMemo(() => getAverage(list), [list])
```