import React, { useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";

// function App() {
//   const [data, setData] = useState(null);
//   const NEWS_API = process.env.REACT_APP_NEWS_API;
//   console.log(NEWS_API)
//
//   // then 이용
//   // const onClick = () => {
//   //   axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   //     .then(response => setData(response.data))
//   //     .catch(error => console.log(error))
//   // }
//
//   // async/await 이용
//   const onClick = async () => {
//     try {
//       const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${NEWS_API}`);
//       setData(response.data)
//     }
//     catch (e) {
//       console.log(e)
//     }
//   }
//
//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       { data && <textarea value={JSON.stringify(data, null, 2)} readOnly={true} cols="30" rows="10"></textarea>}
//     </div>
//   );
// }

const App = () => {
  return (
    <NewsList />
  )
}

export default App;
