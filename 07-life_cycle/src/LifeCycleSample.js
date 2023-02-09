import React, {Component} from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  }

  myRef = null;

  // 컴포넌트를 만들 때 처음으로 실행됨
  constructor (props) {
    super (props);
    console.log('constructor');
  }

  // 컴포넌트가 mount될 때, update될 때 실행
  // props로 받아온 값을 state에 동기화
  static getDerivedStateFromProps (nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  // 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    console.log('componentDidMount')
  }

  // props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드(boolean)
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 맨 끝자리가 4가 아니면 true -> 리렌더링
    // 숫자의 맨 끝자리가 4면 false -> 리렌더링을 시작하지 않음
    return nextState.number % 10 !== 4;
  }

  // 컴포넌트를 DOM에서 제거할 때 실행
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    })
  }

  // render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전 호출
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 컴포넌트 리렌더링을 완료한 후 실행됨
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트 되기 직전 색상 : ', snapshot);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color
    }

    return (
      <div>
        <h1 style={style} ref={ref=>this.myRef=ref}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;