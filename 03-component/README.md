# [3장] 컴포넌트

## 3.1 클래스형 컴포넌트

컴포넌트를 선언하는 **2가지** 방법

- **함수형 컴포넌트**
    - 클래스형 컴포넌트보다 선언하기 훨씬 편하다
    - 메모리 자원도 클래스형 컴포넌트보다 덜 사용한다
    - 빌드한 후 배포할 때도 결과물의 파일 크기가 더 작다
    - state와 라이프 사이클 API 사용이 불가능*했었다*
        - v16.8 업데이트 이후 **Hooks의 도입**으로 해결됨
- **클래스형 컴포넌트**
    - state 기능 및 라이프사이클 기능을 사용할 수 있다
    - 임의 메서드를 정의할 수 있다
    - `render` 함수가 꼭 있어야 하고, 그 안에 보여줄 JSX를 반환해야 한다

## 3.2 첫 컴포넌트 생성

- 함수형 컴포넌트 webStorm short-cut : `rsf` , `rsc`
- 클래스형 컴포넌트 webStorm short-cut : `rcc`

### export와 import

- **export**
    - 다른 파일에서 이 파일을 import 할 때 내보내진다
- **import**
    - 다른 파일의 export된 클래스를 불러올 수 있음
    - `export default` 된 파일은, `{}` 없이 불러옴

## 3.3 props

- properties의 준말, **컴포넌트 속성**을 설정할 때 사용하는 요소
- 부모 컴포넌트에서 설정할 수 있음
- props는 **비구조화 할당 문법(=구조 분해문)**을 통해 더 쉽게 접근할 수 있음
    - 클래스형 컴포넌트에서는 `render()` 내부에 작성

        ```jsx
        render() {
        	const { name, children, age } = this.props;
        	return (
        		<div>
        			...
        		</div>
        )}
        ```


### props가 없을 때 기본 값 설정

- `.defaultProps`

    ```jsx
    const MyComponent = { name } => {
      return (
        <div>
          안녕하세염 제 이름은 {name} 입니다아아악
        </div>
      );
    };
    
    MyComponent.defaultProps = {
      name: '디폴트 네임'
    }
    ```


### 태그 사이의 내용을 보여주는 children

- 속성으로 값을 내려보내지 않고 **태그 사이의 값**을 자식 컴포넌트에게 전달할 수 있음

    ```jsx
    <MyComponent>김규리</MyComponent>
    ```

- `children` 으로 접근할 수 있음

### props의 type을 미리 지정할 수 있다!!

- shortcut의 뒤에 `p` 를 붙히면 자동으로 import 된다

    ```jsx
    import PropTypes from 'prop-types';
    
    ...
    
    MyComponent.propTypes = {
      age: PropTypes.number
    };
    ```

- `.isRequired` 까지 설정하면 값이 없을 때 console창에 경고가 뜬다

## 3.4 state

- **컴포넌트 내부**에서 바뀔 수 있는 값
- `this.setState` 를 통해 state 값을 업데이트 할 때는 상태가 **비동기적**으로 업데이트된다

    ```jsx
    <button onClick={() => {
      // 클릭되면 함수가 호출된다.
      // state에 새로운 값을 넣을 수 있다
      this.setState({number: number+1});
      this.setState({number: this.state.number + 1});
    }}>
      +1
    </button>
    ```

  위의 결과는 number가 2씩 커질 것 같지만, setState를 이용해 state값을 바꾼다고 해서 바로 값이 바뀌지 않는다…

- `setState()` 에 객체 대신 함수를 인자로 넣어주자! (props는 생략 가능)

    ```jsx
    this.setState((prevState[, props]) => {
      return {
        number: prevState.number + 1
      }
    });
    ```

- 값이 **업데이트 되고 난 뒤** 특정 작업을 실행하고 싶다면?

  `setState`의 **두번째 파라미터**로 **콜백 함수**를 등록하자

- **함수형 컴포넌트**에서는 `useState Hooks`를 이용한다

## 3.5 state를 사용할 때 주의사항

- state의 값을 바꿀 때는 **세터 함수**를 사용해야 한다.
- 배열이나 객체를 업데이트 해야할 때는?
  1. 배열이나 객체 **사본**을 만들기
  2. 그 사본에 값을 **업데이트** 하기
  3. 그 사본의 상태를 **세터 함수**를 통해 업데이트
- 사본을 만들 때
  - `spread operator(…)`
  - `concat()` : 추가
  - `filter()` : 제거
  - `map()` : 업데이트