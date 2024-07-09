import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { logoutUser } from '../actions/AuthActions';

const Menu = (props) => {

    const handleLogout = (e) => {
      e.preventDefault();
      // const context = useContext(AuthContext); // currentUser y el dispatch que actualiza el currentUser con authReducer
      // logoutUser(context.dispatch);
    } 

    return (
      <nav>
        <ul className="flex">
            <li className="flex-1 mr-2">
            <Link to="/home" className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">Inicio</Link>
            </li>
            <li className="flex-1 mr-2">
            <Link to="/done" className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">Tareas terminadas</Link>
            </li>
            <li className="text-center flex-1">
            <Link to="/proximamente" className='block py-2 px-4 text-gray-400 cursor-not-allowed'>Próximamente</Link>
            </li>
            <a>Logout</a>
        </ul>
      </nav>
    )
}

export default Menu;
