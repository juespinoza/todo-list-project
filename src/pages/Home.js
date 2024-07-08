import React, { useContext, useEffect, useState } from 'react'
import TodoContainer from '../components/TodoContainer'
import Menu from '../components/Menu'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = props => {
  const [showComponent, setShowComponent] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();
  // importamos el contexto
  const context = useContext(AuthContext);
  useEffect(() =>{
    if(context.currentUser.authenticated === true){
      setShowComponent(true);
    } else {
      navigate('/login');
    }
  }, [context.currentUser.authenticated, navigate]);

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
