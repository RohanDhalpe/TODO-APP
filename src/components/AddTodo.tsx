import  { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; 


export interface Todo {
  title: string;
  isCompleted: boolean;
  date: string;
}

export default function AddTodos() {
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<string>();
  const navigate = useNavigate();
  
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setDate(e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    if (title && date) {
      axios.post("http://localhost:8000/todos", {
        title: title,
        isCompleted: false,
        date: date
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to add data");
      });
    } else {
      alert("Todo Cannot be Empty");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 form p-3">
            <h2 className="mb-4">Todo Form</h2>
            <div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a todo :"
                  onChange={(e) => handleChangeInput(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => handleChangeDate(e)}
                  required
                />
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
