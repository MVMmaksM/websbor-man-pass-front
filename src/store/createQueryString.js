export const createQueryString = (params) => {
    let queryString = '';

    if (params)
        queryString = '?';

    for (let prop in params) {
        if(params[prop] !== '' && params[prop] !== null)
            queryString += `${prop}=${params[prop]}&`
    }

    return queryString.slice(0, -1);
}