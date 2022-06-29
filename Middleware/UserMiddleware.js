import { getJwtAccessToken ,deletJwtAccessToken} from "../Service/userAuthentication.js"
import jwt from 'jsonwebtoken'
const userMiddlewares = async(req,res,next)=>{
    const {authorization} = req.headers 
    //console.log(authorization)
    try {
        const varifyToken = await jwt.verify(authorization,process.env.jwt_accesstoken)
        // console.log(varifyToken)
        // const id =await getJwtAccessToken(authorization)
        // console.log(id)
       // console.log(varifyToken)
        if(varifyToken){
            const {_id} = varifyToken
                const id = await getJwtAccessToken(authorization)
                if(_id===id){
                    req.userId = id 
                    next()

                }else{
                    res.json({status:'failed','message':'token not valid!'})

                }
            
        }else{
           
            res.json({status:'failed','message':'token not valid!'})
        }
      
    } catch (error) {
        await deletJwtAccessToken(authorization)
        res.json({status:'failed','message':'you are not authenticatet user!'})
        
    }
   

}
export default userMiddlewares


// try {
//     const id = await getJwtAccessToken(authorization)
//     if(authorization){

//     }else{
//         res.json({status:'failed','message':'Please provide token'})
//     }
  
// } catch (error) {
//     console.log(error)
    
// }