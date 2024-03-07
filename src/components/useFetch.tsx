import { useEffect, useState } from "react";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function useFetch(url: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error Occured : Could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { todos, loading, error };
}