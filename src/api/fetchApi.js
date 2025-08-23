export const post = async (url, body) =>{
    const config = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(url, config)

    await handleErrors(response);

    const responseData = await response.json();
    return responseData;
}

const handleErrors = async(response) => {
    if(!response.ok){
        const responceData = await response.json();
        const error = new Error("");
        error.status = response.status;
        error.details = responceData.details;
        
        throw error;
    }
}