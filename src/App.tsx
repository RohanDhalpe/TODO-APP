import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Error from './components/Error';
import TodoNavbar from './components/TodoNavbar';
import ViewTodo from './components/ViewTodo';
import CreateTask from './components/AddTask';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
         <TodoNavbar/>
         <Routes>
          <Route path='/' element={<Todo/>}/>
          <Route path="/addtodos" element={<CreateTask/>}/>
          <Route path="/viewtodos/:id" element={<ViewTodo />} />
          <Route path='*' element={<Error/>}/>  
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
