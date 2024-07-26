import Navbar from "./NavBar" 

export default function About(){
    
    return (
        <>
        <Navbar/>
            <div className="container my-5 fs-5 d-flex align-items-center" id="AbtSec" style={{height:"500px", textAlign:"justify"}}>
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
