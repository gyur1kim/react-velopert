## 7-0. 개요

- 모든 리액트 컴포넌트는 **라이프사이클(수명주기)**가 존재한다.
  - 렌더링 되기 전 ~ 페이지에서 사라질 때까지
- 라이프사이클은 **언제 필요**할까?
  - 컴포넌트를 처음으로 렌더링할 때 어떤 작업을 처리해야 함
  - 컴포넌트를 업데이트 하기 전후로 작업을 처리해야 함
  - 불필요한 업데이트를 방지해야 함
- 라이프사이클은 클래스형 컴포넌트 한정, 함수형 컴포넌트는 Hooks를 이용한다

## 7-1. 라이프사이클 메서드의 이해

- **Will** - 어떤 작업을 작동하기 **전**에 실행
- **Did** - 어떤 작업을 작동한 **후**에 실행
- 라이프사이클은 크게 **3가지 카테고리**로 나눈다
  - **마운트**
    - DOM이 생성되고 웹 브라우저상에 나타나는 것
    - `constructor` : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
    - `getDerivedStateFromProps` : props에 있는 값을 state에 넣을 때 사용하는 메서드
    - `render` : UI를 렌더링하는 메서드
    - `componentDidMount` : 컴포넌트가 웹 브라우저 상에 **나타난 후** 호출하는 메서
  - **업데이트**
    - 업데이트가 일어나는 경우
      1. props가 바뀔 때
      2. state가 바뀔 때
      3. 부모 컴포넌트가 리렌더링 될 때
    - `getDerivedStateFromProps` : props에 있는 값을 state에 넣을 때 사용하는 메서드
    - `shouldComponentUpdate` : 컴포넌트를 리렌더링 할지 말지 결정(boolean값을 리턴)

      this.forceUpdate() 함수를 호출하면 이 과정을 생략, 바로 render 함수를 호출한다.

    - `render` : UI를 렌더링하는 메서드
    - `getSnapshotBeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
    - `componentDidUpdate` : 컴포넌트의 **업데이트 작업이 끝난 후** 호출하는 메스더
  - **언마운트**
    - 컴포넌트를 DOM에서 제거하는 것
    - `componentWillUnmount` : 컴포넌트가 웹 브라우저 상에서 **사라지기 전** 호출하는 메서드

## 7-2. 라이프사이클 메서드 살펴보기

- `render`
  - 유일한 **필수 메서드**
  - 이벤트 설정이 아닌 곳에서 setState를 사용해선 안됨
  - 브라우저의 DOM에 접근해선 안된다

    ⇒ 위의 2개는 `componentDidMount` 에서 처리해야 한다

- `constructor`
  - 컴포넌트를 만들 때 **처음으로 실행**된다.
  - 초기 state를 정할 수 있음
- `getDerivedStateFormProps`
  - v16.3 이후 새로 만들어진 라이프사이클
  - props로 받아온 값을 **state에 동기화**시키는 용도 (nextProps, prevState)
  - 컴포넌트가 mount 될 때, update 될 때 호출
- `componentDidMount`
  - 컴포넌트를 만들고, **첫 렌더링을 다 마친 후** 실행
  - 이 안에서 다른 자바스크립트 라이브러리/프레임워크의 함수를 호출, 이벤트 등록, setTimeout, setInterval, 네트워크 요청같은 비동기 작업을 처리
- `shouldComponentUpdate`
  - props 또는 state를 변경했을 때, **리렌더링을 시작할지 여부를 지정**하는 메서드
  - 반드시 true 또는 false를 리턴 (default값은 true)
  - 현재 props와 state → `this.props` , `this.state` 로 접근 가능
  - 새로 설정될 props와 state → `nextProps` , `nextState` 로 접근 가능
- `getSnapshotBeforeUpdate`
  - v.16.3 이후 새로 만들어진 라이프사이클
  - render에서 만들어진 결과물이 브라우저에 **실제로 반영되기 직전** 호출
  - 이 메서드의 return 값을 componentDidUpdate의 **세번째 파라미터**인 snapshot 값으로 전달받을 수 있음
  - 주로 업데이트 하기 직전의 값을 참고할 일이 있을 때 활용\
- `componentDidUpdate`
  - 리렌더링을 완료한 후 실행
  - 업데이트가 끝났기 때문에 DOM 관련 처리를 해도 무방
  - prevProps, prevState 를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근 가능
- `componentWillUnmount`
  - 컴포넌트를 DOM에서 제거할 때 실행
  - `componentDidMount` 에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 이 메서드에서 제거 작업!
- `componentDidCatch`
  - 리액트 v16에서 새롭게 도입
  - 컴포넌트 렌더링 도중 에러가 발생해도 오류 UI를 보여줌

      ```jsx
      componentDidCatch(error, info) {
          this.setState({
              error: true
          });
      }
      ```

  - error : 파라미터에 어떤 에러가 발생했는지 알려줌
  - info : 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 줌
  - 단점 : 자신에게 발생한 에러는 잡아낼 수 없음, children에게 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있음!!
  -
    ![image](https://user-images.githubusercontent.com/96561861/218264134-bf17fa84-edb5-43c8-b0d4-eacd7ee5ea90.png)