
import getTodos from "../../lib/getTodos";
import Form from "./form";
import Navbar from "./navbar";
import Todos from "./todos";


export default async function Home () {
  const todos = await getTodos()
  return (
    <>
    <Navbar/>
      <div className="container" style={{ marginTop: "100px" }}>
        <h1 className="text-center mb-5">TODO APP</h1>
        <Form/>
      <Todos todos={todos}/>
      
      </div>
    </>
  );
}
