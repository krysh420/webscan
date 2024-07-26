

export const getLogs = async() => {

    let data = await fetch("http://127.0.0.1:8000/Logs",{
        method: "GET",
        "Content-Type": "application/json"
    })

    data = await data.json()
    return data.logs



}
export const getResLogs = async() => {

    let data = await fetch("http://127.0.0.1:8000/ResLogs",{
        method: "GET",
        "Content-Type": "application/json"
    })

    data = await data.json()
    return data.ResLogs

}