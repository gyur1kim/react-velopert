import './App.css';
import {useCallback, useRef, useState} from "react";
import {produce} from 'immer';


function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({name: '', username: ''});
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // form에 입력되는 값을 받는 함수
  const onChange = useCallback(e => {
    const {name, value} = e.target;

    // setForm({
    //   ...form,
    //   [name]: [value]
    // });

    // produce를 이용
    // setForm(produce(form, draft => {
    //   draft[name] = value;
    // }))

    setForm(produce(draft => {
      draft[name] = value;
    }))
  }, [form]);

  // form의 값을 data에 넣는 함수
  const onSubmit = useCallback(e => {
    e.preventDefault();
    const info = {
      id: nextId.current,
      name: form.name,
      username: form.username
    };

    // data에 info값 넣기
    // setData({
    //   ...data,
    //   array: data.array.concat(info)
    // });

    // setData(produce(data, draft => {
    //   draft.array.push(info)
    // }))

    setData(produce(draft => {
      draft.array.push(info);
    }))

    // form 초기화
    setForm({
      ...data,
      name: '',
      username: ''
    });
    nextId.current += 1;
  }, [data, form.name, form.username]);

  // data의 항목 삭제하기
  const onRemove = useCallback(id => {
    // setData({
    //   ...data,
    //   array: data.array.filter(info => info.id !== id)
    // });

    // setData(produce(data, draft => {
    //   draft.array.splice(draft.array.findIndex(info => info.id === id-1), 1);
    // }))

    setData(produce(draft => {
      draft.array.splice(draft.array.findIndex(info => info.id === id), 1)
    }))
  }, [data]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>

      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
