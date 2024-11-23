import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import ModeContext from "../context/modeContext"


export default function IndLogs(props) {
    const context = useContext(ModeContext);
    const  {API_KEY} = context;
    const [Display, setDisplay] = useState("hidden")
    const [Text, setText] = useState("View Fix")
    const [Logs, setLogs] = useState(null)
    const { log } = props
    const [Links, setLinks] = useState(null)
    useEffect(() => {
        if (props.array) {
            setLogs(props.array)
        }
    }, [])
    const filterByid = (id) => {

        if (Logs) {
            const foundItem = Logs.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.log;
            }

        }
    }

    const getLinks = async (id) => {
        if (Text === "View Fix") {
            const result = filterByid(id)
            if (result) {
                const resp = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY!==""?API_KEY:""}&cx=e72555cfa1c7e46ee&q=${result}`)
                const data = await resp.json()
                setLinks(data.items)
                setDisplay("block")
                setText("Close")
            }
        } else {
            setDisplay("hidden")
            setText("View Fix")

        }
    }
    return (
        <>
            <div className="card my-4 mx-2 max-w-[inherit] text-[#3d2e00] bg-[#ffcd37] border-1 border-[#3b2d00] cursor-pointer hover:#ffc107 rounded-lg" >
                <div className="card-body flex items-center p-4 ">
                    <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{ marginBottom: "2px" }} viewBox="0 0 16 16">
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    </div>
                    <div className="text mx-3 w-full" style={{ textAlign: "justify" }}>
                        <h4 className="card-title text-break mb-0 text-xl font-medium">{log.log}</h4>
                        <div className={`bg-[#ffe8a5] h-fit rounded-lg p-[10px] mt-[10px] text-[#3d2e00] break-all ${Display} `}>
                            {!Links ? "no Links" :
                                <ul>
                                    {Links.map((item, index) => {
                                        return <li key={index} className="my-2"><Link to={item.link} target="_blank" style={{ color: "#3d2e00" }}>{item.link}</Link></li>
                                    })}
                                </ul>
                            }
                        </div>
                    </div>
                </div>
                <div className="butn px-4 " style={{ display: "flex", justifyContent: "end" }}><button onClick={() => { getLinks(log.id) }} type="button" className="bg-[#6b5000] text-[#fff5d8] w-fit mr-[22px] mb-[14px] hover:bg-[#4e3a00] hover:text-[#fff5d8] p-2 rounded-lg ">
                    {Text}
                </button></div>
            </div>

        </>
    )
}