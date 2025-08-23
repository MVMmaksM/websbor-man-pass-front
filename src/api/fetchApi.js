export const post = async (url, body) => {
    const config = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    let response;

    try {
        response = await fetch(url, config)

        await handleApiStatus(response);

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        //если статус заполнен значит ошибка выброшена из handleApiStatus
        //просто пробрасываем ее дальше
        if (error?.status)
            throw error;
        else {
            //сели ошибка сетевая, то выкидываем исключение
            throw new Error(`${response?.status || null}:${error?.message}`);
        }
    }
}

export const get = async (url) => {
    const config = {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let response;

    try {
        response = await fetch(url, config)

        await handleApiStatus(response);

        const responseData = await response.json();      
        return responseData;

    } catch (error) {
        //если статус заполнен значит ошибка выброшена из handleApiStatus
        //просто пробрасываем ее дальше
        if (error?.status)
            throw error;
        else {
            //сели ошибка сетевая, то выкидываем исключение
            throw new Error(`${response?.status || null}:${error?.message}`);
        }
    }
}

const handleApiStatus = async (response) => {
    if (!response.ok) {
        const responceData = await response.json();
        const error = new Error("");
        error.status = response.status;
        error.details = responceData.details;

        throw error;
    }
}