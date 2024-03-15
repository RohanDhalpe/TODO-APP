import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";

const useFetch = (url: string) => {
  const [response, setResponse] = useState<Todo[]>([]);
  const [error, setError]= useState("");
  const [loader, setLoader]= useState(true);

  const fetchData = async () => {
    try {
      const data = await axios.get(url);
      setResponse(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, loader };
};

export default useFetch;
