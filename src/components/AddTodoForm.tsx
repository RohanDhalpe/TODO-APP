import { useState } from "react";

const TodoForm = ({todo, handleAdd,handleInput}:{todo:string,handleAdd: ()=>void, handleInput: (e:any)=>void}) => {
  
  return ( 
    <div>
        <input type="text" value={todo} placeholder="Enter a todo" onChange={handleInput} />
        <button onClick={handleAdd} className="add-button"> Add Todo</button> 
    </div>
   
   );
};
 
export default TodoForm;