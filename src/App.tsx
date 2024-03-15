import './App.css';
import Todo from './components/Todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error';
import TodoNavbar from './components/TodoNavbar';
import ViewTodo from './components/ViewTodo';
import CreateTask from './components/CreateTask';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient()
function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TodoNavbar />
          <Routes>
            <Route path='/' element={<Todo />} />
            <Route path="/addtodos" element={<CreateTask />} />
            <Route path="/viewtodos/:id" element={<ViewTodo />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
