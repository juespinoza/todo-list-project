import React, { useContext, useState, useEffect } from 'react';
import TodoContainer from '../components/TodoContainer';
import AuthGlobal from '../store/AuthGlobal';

const Home = props => {
  const context = useContext(AuthGlobal);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    if (context.stateUser.isAuthenticated !== true) {
      props.history.push("/login");
    }
    setShowChild(true);
  }, [context.stateUser.isAuthenticated, props.history]);

  if(!showChild){
    return null;
  } else {
    return <TodoContainer />
  }
}

export default Home
