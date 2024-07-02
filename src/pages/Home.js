import React, { useEffect, useState } from 'react'
import TodoContainer from '../components/TodoContainer'
import Menu from '../components/Menu'
import { useNavigate } from 'react-router-dom';

const Home = props => {
  const [showComponent, setShowComponent] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();
  useEffect(() =>{
    // accion para comprobar que existe el item jwt en el localStorage
    if(jwt){
      // Si existe: renderizamos el componente
      setShowComponent(true);
    } else {
      // Si No existe: redireccionamos a /login
      setShowComponent(false);
      console.log("llega al redirect");
      // navigate('/login');
    }
  }, []);
  

  if(!showComponent){
    return null;
  } else {
    return (
      <div>
          <Menu />
          <TodoContainer />
      </div>
    )
  }
}

export default Home
