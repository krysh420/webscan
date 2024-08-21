import { useContext, useEffect } from "react"
import Navbar from "./NavBar"
import ModeContext from "../context/modeContext"
import Footer from './Footer.jsx'
export default function About() {
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
      <Navbar />
      <div className="bg-[#f6faff] absolute text-blue-950 translate-y-[-26vh] sm:translate-y-[0vh] max-sm:px-8 text-justify px-20 pt-10 text-xl h-fit " id="content">
        <div className="about h-[100vh]">
          Vulnerabilities in apps are a significant issue due to their potential to expose sensitive user data and disrupt services. Flaws in app design can be exploited by attackers to gain unauthorized access, leading to data breaches, financial loss, and privacy violations. With apps being integral to personal and business operations, any weakness can be a gateway for cyber threats.

          <br /><br />

          If you ever feel the risk of Vulnerability in any app, be sure to use this tool WebScan. It is a FOSS tool designed in such a way that it can detect the Vulnerabilities in a WebApp and immediately informs you about the same. Supported by GUI through React, WebScan is built on python backend.
          This makes the app easier to use, as you can read the logs in a layman language. This is done by integrating OpenAI, which explains the Vulnerability issue to users, so that they don't have to spend hours reasearching upon the issue.

          <br />
          <br />
          This tool is not built or maintained by any company, but by BTech Undergrads, from New Delhi (India).
        </div>
        <div className="footer mx-[-32px] sm:mx-[-80px] max-[522px]:mt-40 max-[416px]:mt-[90vh] max-[292px]:mt-[120vh] mb-[-16px]"><Footer /></div>
      </div>
    </>
  )
}
