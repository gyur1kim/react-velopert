# 15.1 Context API를 사용한 전역 상태 관리 흐름 이해하기

- 컴포넌트 간에 데이터를 props로 전달
  
  - 여기저기서 쓰이는 데이터는, 최상위 컴포넌트인 App의 state에 넣어서 관리한다.
  
  - 데이터를 전달하는 과정이 복잡하다!!
  
  - 유지보수성이 낮아질 가능성 UP

- 이런 문제를 해결하기 위한 상태 관리 라이브러리
  
  - 리덕스, MobX 등..

- **Context API**
  
  - Context를 만들어 단 한 번에 원하는 값을 받아와 사용할 수 있음

# 15.2 Context API 사용법 익히기

## 15.2.1 Context 생성하기

- `createContext()` 함수를 import 하여 **Context를 생성**할 수 있다.
  
  ```javascript
  import { createContext } from "react";
  
  const ColorContext = createContext({ color: "black" });
  ```

## 15.2.2 Consumer 사용하기

- Context 안의 **값**을 불러올 때 사용하는 **컴포넌트**

- 생성한 Context에서 **Consumer 컴포넌트**를 이용할 수 있다.
  
  ```jsx
  import React from 'react';
  import ColorContext from "../contexts/color";
  
  function ColorBox() {
    return (
      <ColorContext.Consumer>
        { value => (
            <div
              style={{
                width: "64px",
                height: "64px",
                background: value.color
              }}
            />
        )}
      </ColorContext.Consumer>
    );
  }
  
  export default ColorBox;
  ```

- Consumer 사이에 함수를 넣은 것
  
  == `Function as a child`, `Render Props`
  
  - [참조] 컴포넌트의 **children이 있어야 할 자리**에 **함수를 전달**하는 것
  
  ```jsx
  // Render props 예
  
  const RenderPropsSample = ({children}) => {
    return <div>결과 : {children(5)}</div>
  }
  
  // =====================================================
  
  <RenderPropsSample>
    {value => value * 2}
  </RenderPropsSample>
  ```

## 15.2.3 Provider

- Context의 **value를 변경**할 수 있다

- Context의 ***Provider를 사용하지 않으면?*** => Context에 *기본으로 넣은 값을 사용*

- Context의 ***Provider를 사용하면?*** => *value에 명시된 값 사용*
  
  - 따라서 **value를 명시하지 않으면 오류가 발생**함

```jsx
function App() {
  return (
    <ColorContext.Provider value={{color: "red"}}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}
```

# 15.3 동적 Context 사용하기

- Context의 값을 동적으로 수정하려면?
  
  ```javascript
  const ColorContext = createContext({ state: { color: "black", subColor: "red"},
                                       actions: {
                                         setColor: () => {},
                                         setSubColor: () => {}
                                       }
  });
  
  const ColorProvider = ({children}) => {
    const [color, setColor] = useState("black");
    const [subColor, setSubColor] = useState("red");
  
    const value = {
      state: {color, subColor},
      action: {setColor, setSubColor}
    }
  
    return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  }
  
  // const ColorConsumer = ColorContext.Consumer와 같은 의미
  const { Consumer: ColorConsumer } = ColorContext;
  
  export {ColorProvider, ColorConsumer};
  export default ColorContext;
  ```
  
  1. **ColorProvider**라는 **새로운 컴포넌트**를 작성
     
     - 렌더링하는 값은 `ColorContext.Provider`
     
     - value값은 useState를 이용함
  
  2. **createContext** 사용 시 **기본값 수정**
     
     - createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시켜 주는 것이 좋다

# 15.4 Consumer 대신 Hook/static contextType 사용하기

## 15.4.1 useContext Hook

- useContext hook

- 함수형 컴포넌트에서 Context를 편하게 사용할 수 있다.

```javascript
const { state } = useContext(ColorContext);
```

- Render props 패턴이 불편하다면, useContext hook을 사용해 훨씬 편하게 context의 값을 조회할 수 있다.

## 15.4.2 static contextType

- 클래스형 컴포넌트에서 Context를 좀 더 쉽게 사용하고 싶을 때 사용한다

# 15.5 정리

**기존의 컴포넌트**

- 컴포넌트 간 상태를 교류해야 할 땐 부모->자식 흐름으로 props를 통해 전달

**Context API**

- 프로젝트의 컴포넌트 구조가 간단하다면, 굳이 사용하지 않아도 됨

- 전역적으로 여기저기서 사용되는 상태가 있고, 컴포넌트의 개수가 많다면 사용해보세요!
