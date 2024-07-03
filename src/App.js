import './App.css';
import TodoContainer from './components/TodoContainer';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../src/pages/Home';
import Done from '../src/pages/Done';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useEffect, useReducer } from 'react';
import { AuthContext } from './contexts/AuthContext';
import authReducer from './reducers/AuthReducer';
import { jwtDecode } from 'jwt-decode';
import { setCurrentUser } from './actions/AuthActions';

function App() {
  const [user, dispatch] = useReducer(authReducer,  {
    authenticated: null,
    email: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      const decoded = jwtDecode(localStorage.getItem('jwt'));
      dispatch(setCurrentUser(decoded.email));
    }
  }, []);

  return (
    <div className="min-h-96 flex flex-col flex-wrap justify-center content-center">
      <Routes>
        {/* <Route path='/' exact Component={Home} /> */}
        <Route path='/home' Component={Home} />
        <Route path='/done' Component={Done} />
        {/* <Route path='/login' Component={LoginForm} /> */}
        <Route path='/register' Component={RegisterForm} />
      </Routes>
      <AuthContext.Provider value={ { user, dispatch } }>
        { !user ? <LoginForm /> : null }
      </AuthContext.Provider>
    </div>
  );
}

export default App;
