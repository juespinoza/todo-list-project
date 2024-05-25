import React, { useState } from 'react'

const TodoForm = props => {
    const { handleAddTask } = props // destructuring o desestructuracion

    const [tarea, setTarea] = useState("")

    const handleSubmit = (element) => {
        element.preventDefault();
        console.log(tarea)
        handleAddTask({
            done: false,
            id: (+new Date).toString(),
            tarea // tarea: "algo > valor de mi variable de estado tarea"
        })
        setTarea("")
    };

    return (
        <div>
        <form className='todo-form' onSubmit={handleSubmit}>
            <input
             type='text' 
             value={tarea} 
             onChange={(element) => setTarea(element.target.value) }
             />
            <button
             type='submit'
             disabled={(tarea)?"":"disabled"}
             >Agregar</button>
        </form>
        </div>
    )
}

export default TodoForm;
