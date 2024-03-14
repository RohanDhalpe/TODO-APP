import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ViewTodo() {
  const params = useParams();

  const { data: todo, isLoading, isError, error } = useQuery(
    ["todo", params.id],
    async () => {
      const res = await fetch(`http://localhost:8000/todos/${params.id}`).then(
        (resp) => resp.json()
      );
      return res;
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Title: {todo.title}</h5>
          <p className="card-text">Description: {todo.description}</p>
          <p className="card-text">Assignee: {todo.assignee}</p>
          <p className="card-text">Date: {todo.date}</p>
        </div>
      </div>
    </div>
  );
}
