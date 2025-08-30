export const handleErrorReject = (error) => {
    console.log(error);
    
    const err = {};

    if (error.message) {
        const errMsgSplitted = error.message.split(":");

        if (errMsgSplitted.length === 2) {
            err.status = errMsgSplitted[0];
            err.message = errMsgSplitted[1];
        }
        else{
            err.message = error.message;
        }
    }

    if (error.details) {
        err.status = error.status || null;
        err.message = error.details;
    }

    return err;
}