import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({name, children, age}) => {
  return (
    <div>
      <div>안녕하세요 제 이름은 {name}</div>
      <div>나이는 {age}개월</div>
      <div>제 취미는 {children}</div>
    </div>
  );
};

MyComponent.defaultProps = {
  name: '박시현',
  children: '색종이접기',
  age: 29
};

MyComponent.propTypes = {
  age: PropTypes.number
};


export default MyComponent;

