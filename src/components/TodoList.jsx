import React from 'react'
import TodoItem from './TodoItem'

const TodoList = props => {
  const { lista, setLista } = props

  const onChangeStatus = e => {
    const { name, checked } = e.target;
    const updateList = lista.map(item => ({
        ...item,
        done: item.id === name ? checked : item.done
    }));
    console.log(lista);
    setLista(updateList);
};

  const checkboxes = lista.map((item) => {
    console.log(item)
    return <TodoItem key={item.id} data={item} onChange={onChangeStatus}/>
  })

  
  return (
    <div>
      <ul>
        {/* // hardcoding: codigo duro, codigo que no es dinamico */}
        {/* listar nombres de tareas en <li></li>*/}
        {/* {lista.map((item) => <li>{item.tarea}</li>)} */}
        { checkboxes.length ? checkboxes : "La lista esta vacia"}
      </ul>
    </div>
  )
}

export default TodoList
