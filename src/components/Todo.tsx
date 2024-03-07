import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function Todos() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [trigger, setTrigger] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/todos")
      .then((resp) => (setTodolist(resp.data)))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [trigger]);

  const handleCheckbox = (
    todo: Todo,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.checked);
    axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      isCompleted: e.target.checked,
    })
    .then(() => setTrigger(trigger => trigger + 1))
    .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        alert("Deleted Successfully");
        setTrigger(trigger => trigger + 1);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <>
      <div className="todos">
        {todolist.map((item: Todo, index: number) => (
          <div
            key={item.id}
            className="card text-wrap card-content justify-content-center text-center w-50 mt-3 mb-3 d-flex flex-row"
          >
            <h5 className="card-body card-text text-wrap d-inline-flex switch">
              <div onClick={() => navigate("/viewtodos/" + item.id)}>
                {index + 1}.{item.title}
              </div>

              <input
                className="check-box"
                checked={item.isCompleted}
                onChange={(e) => {
                  handleCheckbox(item, e);
                }}
                type="checkbox"
              />
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </h5>
          </div>
        ))}
      </div>
    </>
  );
}
