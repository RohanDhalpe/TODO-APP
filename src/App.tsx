import './App.css';
import AddTodoForm from './components/AddTodoForm';
import Todo from './components/Todo';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Error from './components/Error';
import TodoNavbar from './components/TodoNavbar';
import ViewTodo from './components/ViewTodo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <TodoNavbar/>
         <Routes>
          <Route path="/addtodos" element={<AddTodoForm/>}/>
          <Route path="/viewtodos/:id" element={<ViewTodo />} />
          <Route path='/' element={<Todo/>}/>
          <Route path='*' element={<Error/>}/>  
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
