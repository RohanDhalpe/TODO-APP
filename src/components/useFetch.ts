import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";

const useFetch = (url: string) => {
  const [response, setResponse] = useState<Todo[]>([]);
  const [error, setError]= useState('');
  const [loader, setLoader]= useState(true);
  
  useEffect(() => {
      const fetchData = async () => {
      await axios.get(url)
      .then((data)=>{setResponse(data.data);
        setLoader(false);
      })
      .catch((error)=>setError(error));
       setLoader(false);
      }
    fetchData();
  }, [url])


  return {response, error,loader}
}
export default useFetch;