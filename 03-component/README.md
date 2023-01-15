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