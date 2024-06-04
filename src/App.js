import './App.css';
import TodoContainer from './components/TodoContainer';

function App() {
  return (
    <div className="bg-gray-300	 min-h-96 flex flex-col">
      <header className="">
        <TodoContainer />
      </header>
    </div>
  );
}

export default App;
