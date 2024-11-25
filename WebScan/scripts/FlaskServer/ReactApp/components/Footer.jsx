import {Link} from "react-router-dom"

const Footer = () => {
  
  return (
    <>
    <div id="footer" className="footer bg-[#000a2d] text-blue-50">
      <div className="flex justify-around items-center pt-4">
        <div className="logo">
          <h2 className='text-3xl font-semibold'>WebScan</h2>
        </div>
        <div className="contact">
          <h4 className="pt-2 text-xl"><Link to={"/about"}>Contact Us</Link></h4>
        </div>
      </div>
      <div className="copyright my-4 border border-t-blue-200 border-b-0 border-r-0 border-l-0 min-[1050px]:mx-[21vw]"><p className="text-center py-4 text-sm">Copyright (c) 2024 Krish Mishra | MIT License</p></div>
    </div>
    
    </>
  )
}

export default Footer