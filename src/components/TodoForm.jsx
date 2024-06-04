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
             className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
             />
            <button
             type='submit'
             disabled={(tarea)?"":"disabled"}
             className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
             >Agregar</button>
        </form>
        </div>
    )
}

export default TodoForm;
