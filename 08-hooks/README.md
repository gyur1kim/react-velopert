## 8.1 useState

- `const [value, setValue] = useState(0)`
    - useState 함수의 파라미터에는 상태의 기본값을 넣어준다
    - useState 함수는 배열을 반환한다
        - 상태 값
        - 상태를 설정하는 함수 (set ~~)
            - 이 함수에 파라미터를 넣어서 호출하면, 전달받은 파라미터로 값이 바뀌고 컴포넌트가 리렌더링 됨
- useState 함수는 한 개당 하나의 상태 값만 관리할 수 있음