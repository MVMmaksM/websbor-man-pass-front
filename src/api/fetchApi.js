export const post = async (url, body) =>{
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    const responce = await fetch(url, config)
    const responceData = await responce.json();
    return responceData;
}