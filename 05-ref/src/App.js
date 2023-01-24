import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import ValidationSample from "./Components/ValidationSample";
import ScrollBox from "./Components/ScrollBox";

// function App() {
//   const scrollBox = React.createRef();
//   return (
//     <div>
//       <ValidationSample />
//       <br/>
//       <ScrollBox ref={(ref) => {const scrollBox = ref}} />
//       <button onClick={() => {scrollBox.scrollToBottom()}}>맨 밑으로</button>
//     </div>
//   );
// }
//
// export default App;


class App extends Component {
  render() {
    return (
      <div>
        <ValidationSample />
        <br/>
        <ScrollBox ref={(ref) => {this.scrollBox = ref}} />
        <button onClick={() => {this.scrollBox.scrollToBottom()}}>맨 밑으로</button>
      </div>
    );
  }
}

export default App;
