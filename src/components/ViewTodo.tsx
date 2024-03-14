import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [date, setDate] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/todos/${params.id}`).then(
          (resp) => resp.json()
        );
        setTitle(res.title);
        setDescription(res.description);
        setAssignee(res.assignee);
        setDate(res.date); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {title}</h5>
          <p className="card-text">Description: {description}</p>
          <p className="card-text">Assignee: {assignee}</p>
          <p className="card-text">Date: {date}</p>
        </div>
      </div>
    </div>
  );
}
