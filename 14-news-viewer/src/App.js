import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  // then 이용
  // const onClick = () => {
  //   axios.get('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => setData(response.data))
  //     .catch(error => console.log(error))
  // }

  // async/await 이용
  const onClick = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      setData(response.data)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      { data && <textarea value={JSON.stringify(data, null, 2)} readOnly={true} cols="30" rows="10"></textarea>}
    </div>
  );
}

export default App;
