import React, {Component} from 'react';

class Counter extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     number: 0
  //   };
  // }

  state = {
    number: 0
  };

  render() {
    const { number } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={() => {
          // 클릭되면 함수가 호출된다.
          // state에 새로운 값을 넣을 수 있다

          // setState에 객체를 넣으면 업데이트가 비동기적으로 일어난다.
          // this.setState({number: number+1});
          // this.setState({number: this.state.number + 1});

          // 따라서 setState에 함수를 인자로 넣어주자
          this.setState((prevState, props) => {
            return {
              number: prevState.number + 1
            }
          }, () => {
            console.log('방금 숫자를 올렸습니다!')
          });
        }}>
          +1
        </button>
      </div>
    );
  }
}

export default Counter;