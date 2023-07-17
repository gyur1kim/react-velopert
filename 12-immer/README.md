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