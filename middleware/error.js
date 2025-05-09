const errorHandler = (err, req,res,next)=>{
    // console.error(err.stack);
    if(err.status){
        return res.status(err.status).json({message: err.message});
    }
    res.status(500).json({message: err.message});
}
export default errorHandler;