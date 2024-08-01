// this is a middleware which fetches both the logs and resolved logs, from django to react.

export const getLogs = async () => {
    const resp = await fetch("http://127.0.0.1:8000/Logs",{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data = await resp.json()
    return data

}