import logo from './logo.svg';
import './App.css';

import MyComponent from './Components/MyComponent'
import Counter from "./Components/Counter";


function App() {
  return (
    <div>
      <MyComponent age={'29'}>밥먹기</MyComponent>
      <hr />
      <Counter />
    </div>
  );
}

export default App;
