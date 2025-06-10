//error handler
const httpErrorHandler = (handler, httpErrorCode) =>
{
    return async function(req, res, next)
    {
        try{
            await handler(req, res, next);
        }
        catch(err){
            await res.status(httpErrorCode).json(err.toString());
        }
    }
}

module.exports = {
    httpErrorHandler,
}