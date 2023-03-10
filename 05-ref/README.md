## 5.0 ref란?

> HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 **리액트 프로젝트 내부**에서 **DOM**에 이름을 다는 방법 **ref 개념**
>
- ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동함 → 중복 문제 발생X

## 5.1 ref는 어떤 상황에서 사용해야 할까?

- DOM을 꼭 **직접 건드려야** 할 때
- 리액트에서는 state를 이용해 많은 것을 해결할 수 있음
- 가끔 **state만으로는 해결할 수 없는 기능**이 있다!!
    - 특정 **input에 포커스** 주기
    - **스크롤 박스** 조작하기
    - **Canvas 요소**에 그림 그리기
    - 등…

## 5.2 ref 사용

### 콜백 함수를 통한 ref 설정

- ref를 만드는 가장 기본적인 방법
- **ref를 달고자 하는 요소**에 ref라는 **콜백 함수**를 **props로 전달**하기
  - 이 콜백 함수는 **ref 값**을 **파라미터**로 전달받음
  - 함수 내부에서 파라미터로 받은 ref를 **컴포넌트의 멤버 변수**로 설정해준다.

    ```jsx
    <input ref={(ref) => {this.input = ref}} />
    ```


### createRef를 통한 ref 설정

- 리액트 v16.3부터 작동한다..
- 우선 컴포넌트 내부에서 멤버 변수로 `React.createRef()` 를 담아주어야 함
- 그리고 **해당 멤버 변수**를 ref를 달고자 하는 **요소**에 **ref props**로 넣어주면 됨

    ```jsx
    input = React.createRef();
    
    ...
    
    render () {
        return (
            ...
            <input ref={this.input} />
            ...
        )
    }
    ```

- ref를 설정해준 DOM에 접근하려면 `this.ref.current` 를 조회해야 한다

## 5.3 컴포넌트에 ref 달기

- 컴포넌트 **내부에 있는 DOM**을 컴포넌트 **외부**에서 **사용**할 때 씀

    ```jsx
    <MyComponent 
    	ref={(ref) => {this.myComponent = ref}}
    />
    ```

- `MyComponent` 내부의 **메서드** 및 **멤버 변수**에도 접근할 수 있음
  - == **내부의 ref**에도 접근할 수 있음