import jwt from "jsonwebtoken";

const genrateToken = async (userId) =>{
    try{
        const token = await jwt.sign(
            {userId},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        console.log(token);
        return token;
        
    }catch(err){
        console.log(err);
    }
}
export default genrateToken;