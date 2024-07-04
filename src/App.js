import './App.css';
import TodoContainer from './components/TodoContainer';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../src/pages/Home';
import Done from '../src/pages/Done';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Authentication from './components/Authentication';

function App() {

  return (
    <Authentication>
      <div className="min-h-96 flex flex-col flex-wrap justify-center content-center">
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/home' Component={Home} />
            <Route path='/done' Component={Done} />
            <Route path='/login' Component={LoginForm} />
            <Route path='/register' Component={RegisterForm} />
          </Routes>
      </div>
    </Authentication>
  );
}

export default App;
