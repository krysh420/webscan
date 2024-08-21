import Home from "../components/Home"
import NavBar from "../components/NavBar"


function App() {

  window.addEventListener('resize',()=>{
    if (window.innerWidth<640) {
      document.getElementById("content").style.transform="translateY(-26vh)"
      document.getElementById("content").style.transition="transform 0s"
    }
    else{
      document.getElementById("content").style.transform="translateY(0vh)"
      document.getElementById("content").style.transition="transform 0s"
    }
  })
  return (
    <>
      <NavBar/>
      <div className="bg-[#f6faff] translate-y-[-26vh] sm:translate-y-[0vh]  px-20 max-sm:px-8  py-10" id="content">
        <h1 className="text-4xl font-semibold text-center mb-12">WebScan - Web Vulnerability Scanner</h1>
      <div className="home flex justify-between max-[1050px]:flex-col-reverse"><Home/></div>
      </div>
    </>
  )
}

export default App
