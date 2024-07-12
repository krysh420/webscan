import Todo from "./todo"


const todos = () => {
  return (
    <>
      <div className="mt-5">
        <h2>Your Todos</h2>
        <h4>You have not added any todos yet.</h4>
        <Todo />
      </div>
    </>
  )
}

export default todos