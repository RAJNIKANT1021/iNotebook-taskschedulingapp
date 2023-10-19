const JWT=require('jsonwebtoken');
const JWT_SECRET="inotebook"
const fetchuser=(req,res,next)=>{
    //get the user from jwt token add id to req object

    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please authenticate using a valid token"})
    }
    try{
        const data =JWT.verify(token,JWT_SECRET);
        req.user=data.user;
        next();

    }catch{

        res.status(401).json({error:"please authenticate using a valid token"})
    }
   

  


}
module.exports=fetchuser
