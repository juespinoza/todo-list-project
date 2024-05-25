import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

// Formato de elementos de mi lista de tareas
// {
//     done: false,  // Puede ser true o false, representa si la tarea esta hecha o no.
//     id: (+new Date()).toString(), // identificador de mi tarea
//     tarea // tarea >> tarea: {valor de la variable tarea}
// }


const TodoContainer = () => {

    const [lista, setLista] = useState([])

    const handleAddTask = (objetoTarea) => { 
        console.log("objeto", objetoTarea)
        setLista([...lista, objetoTarea])
    }
    return (
        <div>
            TodoContainer
            <TodoForm handleAddTask={handleAddTask} />
            <TodoList lista={lista} setLista={setLista} />
        </div>
    )
}

export default TodoContainer;
