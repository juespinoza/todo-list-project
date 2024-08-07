import React from 'react'
import TodoItem from './TodoItem'

const TodoList = props => {
  const { lista, borrarTarea, checkTarea } = props
  // console.log('TodoList lista:>', lista);

  const onChangeStatus = e => {
    const { name, checked } = e.target;
    console.log("onChange", name, checked);
    let itemActual = lista.filter((i) => i._id === name)[0]
    checkTarea({
      ...itemActual, 
      done: checked
    })
    // const updateList = lista.map(item => ({
    //     ...item,
    //     done: item.id === name ? checked : item.done
    // }));
    // console.log(lista);
    // checkTarea(updateList);
};

  const checkboxes = lista.map((item) => {
    console.log(item)
    return (
      <div key={item.id} >
        <TodoItem data={item} onChange={onChangeStatus}/>
        <button onClick={() => borrarTarea(item.id)}>borrar {item.name}</button>
      </div>
    )
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
