import { useState } from "react";
import TodoForm from "./AddTodoForm";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [id, setId] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleAdd = () => {
    
      const newTodo: Todo = {
        id: id,
        todo: todo,
        completed: false
      };
      setTodoList([...todoList, newTodo]);
      setTodo("");
      setId(id + 1);
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const checkCompleted = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInput=(e:any)=>{
   setTodo(e.target.value)
  }

  const completedTodos = todoList.filter((todo) => todo.completed);
  const incompleteTodos = todoList.filter((todo) => !todo.completed);

  return (
    <div className="todo-container">
      <h2>Todos</h2>
    
      <TodoForm 
        todo={todo}
        handleAdd={handleAdd}
        handleInput={handleInput}
      />
      <div className="completed-todos">
        <h3>Completed Todos</h3>
        <ul className="todo-list">
          {completedTodos.map((item) => (
            <li key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => checkCompleted(item.id)}
              />
              <span className="completed">{item.todo}</span>
              <button onClick={() => deleteTodo(item.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="incomplete-todos">
        <h3>Incomplete Todos</h3>
        <ul className="todo-list">
          {incompleteTodos.map((item) => (
            <li key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => checkCompleted(item.id)}
              />
              <span>{item.todo}</span>
              <button onClick={() => deleteTodo(item.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
