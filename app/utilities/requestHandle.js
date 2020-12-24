let handleResponse = async function({res, statusCode=200, message="SUCCESS", data={}}){
    return res.status(statusCode).send({message, data})
}

let handleError = async function({res, statusCode = 500, error, message="ERROR" }){
    console.error(error);
    return res.status(statusCode).send({message, error})
}

module.exports = {
    handleResponse,
    handleError
}