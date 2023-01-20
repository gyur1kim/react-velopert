import React, {useState} from 'react';

const EventPracticeFunc = () => {
  // const [username, setUsername] = useState('');
  // const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    message: ''
  })
  const {username, message} = form;

  // const onChangeUsername = (e) => {
  //   setUsername(e.target.value)
  // }
  // const onChangeMessage = (e) => {
  //   setMessage(e.target.value);
  // }
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onClick = () => {
    alert(username + ' : ' + message);
    // setUsername('');
    // setMessage('')
    setForm({
      username: '',
      message: ''
    })
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <div>
      <h1>함수형 컴포넌트로 이벤트 핸들링</h1>
      <input
        type="text"
        name="username"
        // onChange={onChangeUsername}
        onChange={onChange}
        value={username}
        placeholder="사용자명"
      />
      <input
        type="text"
        name="message"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={message}
        placeholder="아무거나 입력해보세요"
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPracticeFunc;
