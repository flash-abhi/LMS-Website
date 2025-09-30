import jwt from "jsonwebtoken";

 const isAuth = async (req,res,next)=>{
   try{
     let {token} =req.cookies
    if(!token){
        return res.status(400).json({message: "No token found"});
    }
    let verifytoken = await jwt.verify(token,process.env.JWT_SECRET)
    if(!verifytoken){
        return res.status(400).json({message: "Authentication failed "});
    }
    req.userId = verifytoken.userId;
    next();
   }catch(err){
    console.log(err);
    return res.status(500).json({message: "Auth Error" })
   }
}
export default isAuth;