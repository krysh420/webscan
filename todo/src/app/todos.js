

import Todo from "./todo"
const todos = (props) => {
  
  return (
    <>
      <div className="my-5">
        <h2>Your Todos</h2>
        {props.todos.length===0?<h4>You have not added any todos yet.</h4>:<div className="d-flex justify-content-between flex-wrap" >{props.todos.map((todo)=>{
          return <Todo key={todo.id} id={todo._id.toString()}
          title={todo.title} desc={todo.desc} deadline={todo.deadline}/>
          })}</div>
          
          }

      </div>
    </>
  )
}

export default todos