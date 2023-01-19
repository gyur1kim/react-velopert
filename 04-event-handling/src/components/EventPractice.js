import React, {Component} from 'react';

class EventPractice extends Component {
  state = {
    message: '',
    username: ''
  }

  // 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key값으로 사용됨
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleClick = () => {
    alert(this.state.username +  ' : ' + this.state.message);
    this.setState({
      message: '',
      username: ''
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }
  
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자 이름"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="메시지"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button
          onClick={this.handleClick}
        >
          확인
        </button>
      </div>
    );
  }
}

export default EventPractice;