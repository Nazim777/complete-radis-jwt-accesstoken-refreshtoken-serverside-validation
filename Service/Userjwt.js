import jwt from 'jsonwebtoken'
import { storeRefreshJwt,storeAccessJwt } from './userAuthentication.js'

const createAccessToken = async(_id) =>{
   try {
    const accessToken = await jwt.sign({_id},process.env.jwt_accesstoken,{expiresIn:'2m'})
    await storeAccessJwt(accessToken,`${_id}`)
    return accessToken
   } catch (error) {
    console.log(error)
   }
    
    }
    const createRefreshToken = async(_id) =>{
        const refreshToken =await jwt.sign({_id},process.env.jwt_refreshtoken,{expiresIn:'30days'})
     await storeRefreshJwt(_id,refreshToken)
        return refreshToken
    
    }
    


export{createAccessToken,createRefreshToken}