import Navbar from "./navbar";
import Todos from "./todos";

export default function Home() {
  return (
    <>
    <Navbar/>
      <div className="container" style={{ marginTop: "100px" }}>
        <h1 className="text-center mb-5">TODO APP</h1>
        <div className="row col-md-12">
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Todo Title</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" autoComplete="off" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Todo Deadline</label>
            <input type="email" className="form-control" id="exampleFormControlInput2" autoComplete="off" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Todo Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" autoComplete="off" style={{ resize: "none" }}></textarea>
        </div>
        <div className="d-flex mt-4 justify-content-end"><button type="submit" className="btn btn-primary">Add</button></div>
      <Todos/>
      
      </div>
    </>
  );
}
