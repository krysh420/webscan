import React, { useContext, useEffect } from 'react'
import NavBar from './NavBar'
import ModeContext from "../context/modeContext"
import Footer from './Footer'


const License = () => {
  const context = useContext(ModeContext)
  const { OnReloadMode } = context
  useEffect(() => {
    OnReloadMode()
  }, [])


  window.addEventListener('resize', () => {
    if (window.innerWidth < 640) {
      document.getElementById("content").style.transform = "translateY(-26vh)"
      document.getElementById("content").style.transition = "transform 0s"
    }
    else {
      document.getElementById("content").style.transform = "translateY(0vh)"
      document.getElementById("content").style.transition = "transform 0s"
    }
  })

  return (
    <>
      <NavBar />
      <div className="bg-[#f6faff] absolute text-blue-950 translate-y-[-26vh] sm:translate-y-[0vh] max-sm:px-8 text-justify px-20 pt-10 text-xl h-fit " id="content">
        <div className='license h-[100vh]'>
          MIT License
          <br />
          <br />
          Copyright (c) 2024 Krish Mishra
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </div>
        <div className="footer mb-[-16px] mx-[-32px] sm:mx-[-80px] max-[807px]:mt-[100vh] max-[341px]:mt-[150vh]"><Footer /></div>
      </div>
    </>
  )
}

export default License