


const globalErrorHandler = (err,req,res,next) =>{
    const status = err.status ||  500
    const msg = err.message || "something is wrong"
    return res.status(status).json({message : msg})
   
}
function notFound(req,res,next){
    const err = new Error("not found")
    err.status = 404
    next(err)
}

module.exports = {globalErrorHandler , notFound}