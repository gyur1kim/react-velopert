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
