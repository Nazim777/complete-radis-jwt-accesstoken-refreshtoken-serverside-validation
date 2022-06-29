import jwt from 'jsonwebtoken'
import { findUserById } from '../Service/userAuthentication.js'
import { createAccessToken } from '../Service/Userjwt.js'
const refreshToken = async(req,res)=>{
    const {authorization} = req.headers 
   try {
    const verifyToken = await jwt.verify(authorization,process.env.jwt_refreshtoken)
    if(verifyToken._id){
        const user = await findUserById(verifyToken._id)
        if(user._id){
            let tokenExp= user.refreshJWT.addedAt 
            const dbRefreshToken = user.refreshJWT.token 
            const today = new Date()
            tokenExp= tokenExp.setDate(
                tokenExp.getDate()+30 
            )
            if(dbRefreshToken===authorization && tokenExp > today){
                const newAccessToken = await createAccessToken(user._id)
                res.json({status:'success',newAccessToken})

            }else{
                res.json({status:'failed','message':'token is expired!'})
            }
            
            

        }else{
            res.json({status:'failed','message':'token not valid!'})
        }

    }else{
        res.json({status:'failed','message':'token not valid!'})
    }
   } catch (error) {
    res.json({status:'failed','message':'token not valid!'})
    
   }

   
}
export {refreshToken}