## 9.1 CSS

- 가장 기본적인 방식
- CSS 클래스를 **중복되지 않게** 만들기!
  1. 이름 짓는 **규칙**을 활용하기
    - `컴포넌트 이름-클래스`
      - `App-header`
    - BEM 네이밍, 해당 클래스의 용도를 명황하기 작성하기
      - `card__title-primary`
  2. **CSS selector**를 사용하기

## 9.2 Sass

- **S**yntactically **A**wesome **S**tyle **S**heets, CSS 전처리기
- 복잡한 작업을 쉽게 할 수 있도록 해줌
- 스타일 코드의 재활용성을 높여줌
- 코드의 가독성을 높여 유지 보수를 더욱 쉽게 해줌
- 확장자 : `.scss` , `.sass`
  - `.sass`

      ```sass
      $font-stack: Helvetica, sans-serif
      $primary-color: #333
      
      body
        font: 100% $font-stack
        color: $primary-color
      ```

  - .scss → 세미콜론과 중괄호 사용

      ```scss
      $font-stack: Helvetica, sans-serif;
      $primary-color: #333;
      
      body {
        font: 100% $font-stack;
        color: $primary-color;
      }
      ```

- `npm install node-sass`

### 변수 선언하기

`$name: value`

- 색이든, 크기든 뭐든 변수로 지정해놓고 갖다쓸 수 있음

    ```scss
    $red: #fa5252;
    $orange: #fd7e14;
    $yellow: #fcc419;
    ```


### @mixin

- 재사용되는 스타일 블록을 함수처럼 사용할 수 있음
- 정의하기 : `@mixin name($args) { CSS style }`

    ```scss
    @mixin square($size) {
      $calculated: 32px * $size;
      width: $calculated;
      height: $calculated;
    }
    ```

- 호출하기 : `@include name`

    ```scss
    red {
      background: $red;
      @include square(1);
    }
    ```


### utils 함수 분리하기

- 여러 파일에서 사용될 수 있는 Sass 변수 및 믹스인은 다른 파일로 따로 분리하여 작성
- 필요한 곳에서 쉽게 불러와 사용할 수 있음!
- 분리한 utils.scss 파일은 `@import` 하여 사용하기

  `@import './styles/utils';`


### node_modules 에서 라이브러리 불러오기

- 물결문자 `~` 를 이용하면 상대경로를 이용하지 않아도 됨!
  - `‘../../../node_modules/library/styles’` ⇒ `‘~library/styles’`
- 물결 문자를 사용하면 자동으로 node_modules에서 라이브러리 디렉터리를 탐지하여 스타일을 불러올 수 있음


## 9.3 CSS Module

- **클래스 이름**을 **고유한 값**, `[파일이름]_[클래스 이름]__[해시값]` 형태로 자동으로 만들어 컴포넌트 스타일 클래스 이름이 **중첩되는 현상을 방지**하는 기술
- `.module.css` 확장자로 파일을 저장하면 CSS Module이 적용된다
- 해당 클래스는 스타일을 **직접 불러온 컴포넌트 내부에서만 작동**함
- 만약 전역에서 사용된다면 `:global` 을 앞에 입력하여 글로벌 CSS임을 명시하자.

```css
// CSSModule.module.css
.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

:global .something{
  font-weight: 800;
  color: aqua;
}
```

```jsx
// CSSModule.js
import React from 'react';
import styles from './CSSModule.module.css'

function CssModule() {
  return (
    <div className={styles.wrapper}>
      안녕하세요 저는 <span className="something">CSS Module!</span>
    </div>
  );
}

export default CssModule;
```

- module 파일에서는 **객체**를 하나 전달한다.
  - **객체**에는, 스타일 파일에서 사용한 **클래스 이름**과 해당 이름을 **고유화한 이름**이 `키-값 형태`로 들어있다.
- 클래스를 사용하려면, 객체에 접근하여 사용하면 됨
  - `className={styles.wrapper}`
  - `:global` 로 선언된 클래스는 그냥 문자열로 넣어주면 됨
  - 클래스는 백틱을 이용하여 여러 개를 작성할 수 있음

      ```jsx
      <div className={`${styles.wrapper} ${styles.inverted}`} />
      ```