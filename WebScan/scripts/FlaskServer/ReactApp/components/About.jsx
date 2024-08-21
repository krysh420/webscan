import { useContext, useEffect } from "react"
import Navbar from "./NavBar"
import ModeContext from "../context/modeContext"

export default function About() {
  const context = useContext(ModeContext)
  const { OnReloadMode } = context
  useEffect(() => {
    OnReloadMode()
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-[#f6faff] text-blue-950 translate-y-[-26vh] sm:translate-y-[0vh] max-sm:px-8 fs-5 d-flex align-items-center h-[500px] text-justify px-20 pt-10 text-xl" id="content">
        Vulnerabilities in apps are a significant issue due to their potential to expose sensitive user data and disrupt services. Flaws in app design can be exploited by attackers to gain unauthorized access, leading to data breaches, financial loss, and privacy violations. With apps being integral to personal and business operations, any weakness can be a gateway for cyber threats.

        <br /><br />

        If you ever feel the risk of Vulnerability in any app, be sure to use this tool WebScan. It is a FOSS tool designed in such a way that it can detect the Vulnerabilities in a WebApp and immediately informs you about the same. Supported by GUI through React, WebScan is built on python backend.
        This makes the app easier to use, as you can read the logs in a layman language. This is done by integrating OpenAI, which explains the Vulnerability issue to users, so that they don't have to spend hours reasearching upon the issue.

        <br />
        <br />
        This tool is not built or maintained by any company, but by BTech Undergrads, from New Delhi (India).
      </div>
    </>
  )
}
