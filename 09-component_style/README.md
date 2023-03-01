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