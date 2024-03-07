import  { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; 

export default function AddTodos() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (title) {
      axios.post("http://localhost:8000/todos", {
        title: title,
        isCompleted: false,
      })
      .then(() => {
        navigate("/");
        alert("Data Added successfully");
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
    <div className="container">
      <input
        type="text"
        placeholder="Enter Todos:"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-danger" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
