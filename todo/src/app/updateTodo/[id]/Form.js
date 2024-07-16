"use client"
import { useState } from "react"
import { UpdateTodo } from "../../../../lib/updateTodos";

const Form = (props) => {
    const [Todo, setTodo] = useState({title:props.todo.title,desc:props.todo.desc,deadline:props.todo.deadline})

    const onchange = (e) => {
        setTodo({...Todo,[e.target.name]:e.target.value})
    }
    const submit = async() => {
      await UpdateTodo(props.id,Todo)
  }
  return (
    <>
    <div className="container" style={{marginTop:"100px"}}>
      <h1 className="text-center my-5">Update Your Todo</h1>
    <div className="row col-md-12">
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Todo Title</label>
            <input 
            onChange={onchange} 
            defaultValue={Todo.title} type="email" name="title" className="form-control" id="exampleFormControlInput1" autoComplete="off" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Todo Deadline</label>
            <input 
            onChange={onchange} 
            defaultValue={Todo.deadline} name="deadline" type="email" placeholder="Write none if no deadline" className="form-control" id="exampleFormControlInput2" autoComplete="off" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Todo Description</label>
          <textarea 
          onChange={onchange} 
          defaultValue={Todo.desc} className="form-control" id="exampleFormControlTextarea1" name="desc" rows="3" autoComplete="off" style={{ resize: "none" }}></textarea>
        </div>
        <div className="d-flex mt-4 justify-content-end"><button type="submit" 
        onClick={submit} 
        className="btn btn-primary">Update</button>
      </div>
    </div>
    </>
    )
}

export default Form