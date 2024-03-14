import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export interface Todo {
  title: string;
  isCompleted: boolean;
  date: string;
}

export default function AddTodos() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (title && date) {
      axios
        .post("http://localhost:8000/todos", {
          title: title,
          isCompleted: false,
          date: date,
        })
        .then(() => {
      
          navigate("/");
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Failed to add data");
        });
    } else {
      alert("Todo cannot be empty");
    }
  };

  return (
    <>
      <div className="form-details text-center">
        <form onSubmit={handleAdd}>
          <h2>- Add Task - </h2>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            className="form-control"
            placeholder="Add a todo :"
            value={title}
            onChange={(e) => handleChangeInput(e)}
            required
          />
          <br />
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => handleChangeDate(e)}
              required
            />
          </div>
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}
