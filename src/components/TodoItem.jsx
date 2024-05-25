import React from 'react'

const TodoItem = props => {
  const {
    onChange,
    data: { id, tarea, done },
  } = props;

  return (
    <>
    <label className="todo new-item">
        <input
         className="todo input"
         name={id}
         type="checkbox"
         defaultChecked={done}
         onChange={onChange}
         />
        <div>{tarea}</div>
    </label>
</>

  )
}

export default TodoItem
