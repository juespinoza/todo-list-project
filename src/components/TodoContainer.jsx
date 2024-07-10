import React, { useReducer, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import listaReducer from "../reducers/listaReducer";
import { AuthContext } from '../contexts/AuthContext';
import { getTasks } from "../actions/TaskActions";

// Formato de elementos de mi lista de tareas
// {
//     done: false,  // Puede ser true o false, representa si la tarea esta hecha o no.
//     id: (+new Date()).toString(), // identificador de mi tarea
//     name: // tarea >> tarea: {valor de la variable tarea}
// }

const TodoContainer = () => {
    const context = useContext(AuthContext);
    const [lista, dispatch] = useReducer(listaReducer, []);

    useEffect(() => {
        async function fetchData() {
            const tasks = await getTasks(context.currentUser.email);
            // console.log('tasks', tasks);
            dispatch({
                type: 'initial', 
                payload: tasks
            })
        }
        fetchData();
    }, []);

    const handleAddTask = (objetoTarea) => { 
        dispatch({
            type: 'agregar',
            payload: objetoTarea
        })
    }

    const borrarTarea = (id) => {
        dispatch({
            type: 'borrar',
            id
        })
    }

    const checkTarea = (objetoTarea) => {
        console.log("checkeando", objetoTarea);
        dispatch({
            type: 'check',
            payload: objetoTarea
        })
    }
    return (
        <div>
            TodoContainer
            <TodoForm handleAddTask={handleAddTask} />
            <TodoList lista={lista} borrarTarea={borrarTarea} checkTarea={checkTarea} />
        </div>
    )
}


export default TodoContainer;
