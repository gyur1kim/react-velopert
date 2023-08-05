# 14.1 비동기 작업의 이해

- 웹 어플리케이션에서 서버 쪽 데이터가 필요할 때, **Ajax 기법**을 사용하여 **서버의 API를 호출함**으로써 데이터를 수신한다
  
  - 서버의 API를 사용해야 할 때는 **네트워크** 송수신 과정에서 **시간**이 걸림
  
  - 따라서 작업을 즉시 처리하지 않고, 응답을 받을 때까지 **기다린 후** **전달받은 응답 데이터를 처리**
  
  - ***== 비동기적으로 처리***

<img src="https://i.imgur.com/hh3Mawr.png" title="" alt="" width="556">

- 작업을 동기적으로 처리한다면?
  
  - 요청이 끝날 때까지 기다리는 동안 **웹 어플리케이션 중지**, 요청이 끝나야 다음 예정된 작업을 진행

- 작업을 비동기적으로 처리한다면?
  
  - 웹 어플리케이션이 멈추지 않기 때문에, 동시에 여러 요청을 처리할 수 있고, 다른 함수도 호출할 수 있음

- 비동기 작업을 할 때 가장 흔하게 사용하는 방법은, **콜백 함수**를 사용하는 것

## 14.1.1 콜백 함수

- 파라미터 값이 주어지면 1초 뒤에 10을 더해서 반환하는 함수!

```javascript
// 파라미터 값이 주어지면 1초 뒤에 10을 더해서 반환하는 함수

function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result)
    }
  }, 1000);
}

increase(0, result => {
  console.log(result);
})
```

- 만약 10씩 늘려 10, 20, 30, 40과 같은 형태로 **여러 번 순차적으로 처리**하고 싶다면?
  
  - **콜백 함수**를 **중첩**하세요

```javascript
// 10, 20, 30, 40 순차적으로 늘리기
console.log("=============== 작업 시작 ===============")
increase(0, result => {
  console.log(result);
  increase(result, result => {
    console.log(result);
    increase(result, result => {
      console.log(result);
      increase(result, result => {
        console.log(result);
        console.log("=============== 작업 완료 ===============")
      })
    })
  })
})
```

- 결과

```bash
=============== 작업 시작 ===============
10
20
30
40
=============== 작업 완료 ===============
```

- 콜백 함수 안에 콜백 함수를 넣을 수 있지만, 여러 번 구현되면 **코드의 가독성이 나빠짐**
  
  - ***엄청난 들여쓰기!***
  
  - ***== 콜백 지옥***

## 14.1.2 Promise

- ES6에 도입된, 콜백 지옥같은 코드가 형성되지 않게 하는 방안

- 앞의 기능을 다음과 같이 변경할 수 있다.

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {   // 프로미스 객체 생성하기
    setTimeout(() => {
      const result = number + 10;                      // number에 10을 더한다.
      if (result > 50) {                               // 결과가 50을 넘어가면
        const e = new Error('NumberTooBig');           // 에러를 발생한다.
        return reject(e);                              // reject 처리
      }
      resolve(result);                                 // resolve 처리
    }, 1000)
  })

  return promise;                                      // promise 객체를 처리한다.
}

increase(0)                   // increase 함수에서 0을 처리한다.
  .then(number => {           // increase(0)의 결과를 number로 받는다(resolve)
    console.log(number);
    return increase(number)   // increase(number)를 실행하고, 그 결과값을 .then의 인자로 넘긴다.
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .catch(e => {
    console.log(e)
  })
```

- `resolve`와 `reject` 두 가지 상태
  
  - `resolve`는, 문제가 없을 때 그 결과값을 반환
  
  - `reject`는, 에러가 발생할 때 그 에러를 반환

- 성공 시(resolve), `.then` 메서드의 인자로 값이 넘어간다.

- 실패 시(reject), 뒤의 then은 실행되지 않고, `.catch`로 넘어간다.

- 여러 작업을 연달아 처리할 때, **함수를 여러번 감싸지 않으므로** 콜백 지옥이 생성되지 않는다.

## 14.1.3 async/await

- Promise를 더욱 쉽게 사용할 수 있도록 하는 ES8 문법

- **함수 앞**에 `async`를 추가, **해당 함수 내부**에서 **Promise 앞부분**에 `await`를 추가

```javascript
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 10;                      
      if (result > 50) {
        const e = new Error('NumberTooBig');
        return reject(e);
      }
      resolve(result);
    }, 1000)
  })

  return promise;
}

async function runTask () {
  try {
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
  }
  catch (e) {
    console.log(e);
  }
}

runTask();
```

- `try`, `catch` 구문 실행
- promise의 결과가 resolve이면 try 내부 실행, reject면 catch를 실행하고 종료한다.

# 14.2 axios로 API 호출해서 데이터 받아오기

- `axios`
  
  - HTTP 요청을 Promise 기반으로 처리한다

# 14.8 커스텀 Hook

- 프로젝트의 다양한 곳에서 사용될 수 있는 **유틸 함수들**

- `src/lib` 디렉터리 안에 작성한다
