import React, { useState } from 'react'

const TodoForm = () => {

    const [tarea, setTarea] = useState("")

    const handleSubmit = (element) => {
        element.preventDefault();
        console.log(tarea)
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
