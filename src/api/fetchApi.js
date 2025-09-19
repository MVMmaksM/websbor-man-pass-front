const base_url_api = import.meta.env.VITE_API_URL

export const put = async (path, body) => {
    const config = {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    let response;
    const url = `${base_url_api}${path}`;

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

export const post = async (path, body) => {
    const config = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    let response;
    const url = `${base_url_api}${path}`;

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

export const download = async (path) => {
    const config = {
        method: "GET",
        credentials: 'include'
    }

    let response;
    const url = `${base_url_api}${path}`;

    try {
        response = await fetch(url, config)

        await handleApiStatus(response);

        const blob = await response.blob();
        // Получаем имя файла из заголовка (если сервер отправляет)
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'downloaded-file';

        if (contentDisposition) {
            const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (match != null && match[1]) {
                fileName = match[1].replace(/['"]/g, '');
            }
        }

        // Создаём ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // имя файла при скачивании
        document.body.appendChild(a);
        a.click();

        // Убираем ссылку и освобождаем память
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
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

export const get = async (path) => {
    const config = {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let response;
    const url = `${base_url_api}${path}`;

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