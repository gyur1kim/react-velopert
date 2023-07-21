# 12.0 immer 라이브러리의 필요성

- **불변성을 유지**하며 **상태를 업데이트** 하는 것은 중요하다!
  
  - 이에 사용되는 `전개 연산자`, `배열의 내장 함수` 
  
  - 하지만 배열/객체가 **엄청나게 깊어지면**! 불변성을 유지하면서 업데이트하는 것이 힘들어진다.
  
  ```javascript
  const object = {
    somewhere: {
      deep: {
        inside: 3,
        array: [1, 2, 3, 4]
      },
      bar: 2,
    },
    foo: 1
  }
  ```
  
  - 위의 객체에서, 불변성을 유지하며 `somewhere.deep.inside`의 값을 `4`로 변경해보자
    
    ```javascript
    let nextObject = {
    ...object,
    somewhere: {
      ...object.somewhere,
      deep: {
        ...object.somewhere.deep,
        inside: 4
      } 
    }
    }
    ```
  
  - 또는 `somewhere.deep.array`에 5를 추가해보자
    
    ```javascript
    let nextObject = {
    ...object,
    somewhere: {
      ...object.somewhere,
      deep: {
        ...object.somewhere.deep,
        array: object.somewhere.deep.array.concat(5)
      }
    }
    }
    ```

- **전개 연산자**를 사용함으로써 기존의 가지고 있던 다른 값은 유지하며 원하는 값을 새로 지정함!

- 하지만 **가독성이 좋지 못하고 번거롭다**

- `immer` 라이브러리를 사용하면, 구조가 복잡한 객체도 **매우 쉽고 짧은 코드**를 사용하여 불변성을 유지하며 업데이트 할 수 있다.



# 12.1 immer 사용하기

```javascript
import produce from 'immer';
const nextState = produce(originalState, draft => {
    // 바꾸고싶은 값 바꾸기
    draft.somewhere.deep.inside = 5;
})
```

### `produce` 함수

- `produce(originalState, () => {})`

- 두 가지 파라미터를 받는다
  
  - 수정하고 싶은 상태(state)
  
  - 상태를 **어떻게 업데이트할지** 정의하는 함수

- 두 번째 파라미터로 전달되는 **함수** 내부에서 **원하는 값을 변경**하면, produce 함수가 **불변성 유지를 대신하며 새로운 상태를 생성**함

- produce 예시
  
  ```javascript
  const nextState = produce(originalState, draft => {
    // id가 2인 항목의 checked를 true로 변경하자.
    const todo = draft.find(t => t.id === 2);
    todo.checked = true;   // draft[1].checked === true
  
    // 배열에 새로운 데이터 추가
    draft.push({
      id: 3,
      todo: "일정 관리 앱에 immer 적용하기",
      checked: false
    });
  
    // id가 1인 항목 삭제하기
    draft.splice(draft.findIndex(t => t.id === 1), 1);
  })
  ```