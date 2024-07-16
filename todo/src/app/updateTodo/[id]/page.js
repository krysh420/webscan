import Navbar from "../../navbar";
import { getATodo } from "../../../../lib/getTodos";
import Form from "./Form";


const UpdateForm = async({ params }) => {
  const id = params.id
  const thisTodo = await getATodo(id)


  return (
    <>
    <Navbar/>
    <Form todo={thisTodo} id={id}/>
    </>
  )
}

export default UpdateForm