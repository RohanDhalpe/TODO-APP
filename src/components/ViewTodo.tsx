import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function ViewTodo() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const params = useParams<{ id: string }>();

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${params.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch todo");
      }
      const data = await res.json();
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div>
      {todo ? (
        <>
          <h2>Title: {todo.title}</h2>
          <p>ID: {todo.id}</p>
          <p>Completed: {todo.isCompleted ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
