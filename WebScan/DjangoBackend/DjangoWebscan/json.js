const json = async() => {
    const resp = await fetch("http://127.0.0.1:8000/",{
        method:"GET",
        'Content-Type':"application/json" 
    }) 
    const jsonresp = await resp.json()
    console.log(jsonresp)
}
json()