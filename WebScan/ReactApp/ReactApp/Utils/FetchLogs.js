

export const getLogs = async() => {

    let data = await fetch("http://localhost:8000/WebScan/Logs/GetLogs",{
        method: "GET",
        "Content-Type": "application/json"
    })

    data = data.json()
    return data



}
export const getResLogs = async() => {

    let data = await fetch("http://localhost:8000/WebScan/ResLogs/GetResLogs",{
        method: "GET",
        "Content-Type": "application/json"
    })

    data = data.json()
    return data

}