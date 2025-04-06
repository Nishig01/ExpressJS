const logger= (req, res, next)=>{
    console.log(`Request method: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} Request URL: ${req.url}`);
    next();
}

export default logger;