import Form from "./Form";
import NavBar from "./NavBar";


export default function Home(){
  return (
    <>
    <NavBar/>
      <div className="container" style={{ marginTop: "100px" }}>
        <h1 className="text-center mb-5">WebScan - Web Vulnerability Scanner</h1>
        <Form/>
      </div>
    </>
  );
}