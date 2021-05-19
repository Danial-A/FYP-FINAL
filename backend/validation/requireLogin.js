const RequireLogin =  (req,res,next)=>{
    console.log(req.user)
}

module.exports = RequireLogin
