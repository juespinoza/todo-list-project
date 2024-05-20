import React from 'react'
import TodoItem from './TodoItem'

const TodoList = () => {
  return (
    <div>
      <ul>
        <TodoItem />
        <TodoItem />
      </ul>
    </div>
  )
}

export default TodoList