import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  date: string;
}

export default function Todos() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [trigger, setTrigger] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/todos")
      .then((resp) => setTodolist(resp.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [trigger]);

  const handleCheckbox = (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => {
    axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      isCompleted: e.target.checked,
    })
      .then(() => setTrigger(trigger => trigger + 1))
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        setTrigger(trigger => trigger + 1);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const filteredTodos = todolist.filter((todo) => {
    const titleIncludesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const isStatusMatch = statusFilter === null || todo.isCompleted === statusFilter;
  
    return titleIncludesSearch && isStatusMatch;
  });
  
  filteredTodos.sort((a, b) => {
    if (a.date < b.date) return sortOrder === "asc" ? -1 : 1;
    if (a.date > b.date) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <div className="container">
        <div className="mb-2 d-flex justify-content-between">
          <input
            className="form-control w-25"
            type="search"
            placeholder="Search a Todo...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="d-flex">
            <select className="form-control mr-2" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
              <option value="asc">Sort by Date (Asc)</option>
              <option value="desc">Sort by Date (Desc)</option>
            </select>
            <select
              className="form-control"
              value={statusFilter === null ? "" : statusFilter.toString()}
              onChange={(e) => setStatusFilter(e.target.value === "" ? null : e.target.value === "true")}
            >
              <option value="">Show All</option>
              <option value="true">Show Completed</option>
              <option value="false">Show Pending</option>
            </select>
          </div>
        </div>

        <div className="todos">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((item: Todo) => (
              <div
                key={item.id}
                className="card text-wrap card-content justify-content-center text-center w-50 mt-3 mb-3 d-flex flex-row"
              >
                <h5 className="card-body card-text text-wrap d-inline-flex switch">
                  <div onClick={() => navigate("/viewtodos/" + item.id)}>
                    {item.title}
                    <br />
                    {item.date}
                  </div>
                  <input
                    className="check-box"
                    checked={item.isCompleted}
                    onChange={(e) => handleCheckbox(item, e)}
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
            ))
          ) : (
            <p>No todos found.</p>
          )}
        </div>
      </div>
    </>
  );
}
