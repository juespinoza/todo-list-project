import React from 'react'

const TodoItem = props => {
  const { key, data } = props

  return (
    <li>
      { data.tarea }
    </li>
  )
}

export default TodoItem







