// 각 할 일 항목에 대한 정보를 보여주는 컴포넌트
// todo 객체를 props로 받아와 상태에 따라 다른 UI를 보여줌

import React from 'react';
import cn from 'classnames'
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline } from "react-icons/md";
import '../style/TodoListItem.scss'

function TodoListItem({ todo, onRemove }) {
  const { id, text, checked } = todo
  return (
    <div className="TodoListItem">
      <div className={ cn('checkbox', { checked })}>
        { checked? <MdCheckBox/> : <MdCheckBoxOutlineBlank /> }
        <div className="text">{ text }</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline onClick={()=>onRemove(id)} />
      </div>
    </div>
  );
}

export default TodoListItem;