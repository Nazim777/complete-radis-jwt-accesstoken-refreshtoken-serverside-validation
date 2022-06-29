import UserModel from '../Model/UserModel.js'
import { createUSer ,findUserByfield,validateUser,findUserById,findByuserIdandUpdate,deletJwtAccessToken} from '../Service/userAuthentication.js'
import {createAccessToken,createRefreshToken} from '../Service/Userjwt.js'
const register=async(req,res)=>{
    try {
         const {name,email,password} = req.body
         const existUser = await findUserByfield(email)
         if(existUser){
            res.json({status:'failed','meessage':'user already exist!'})
         } else{

            const user = await createUSer(name,email,password)
            res.json({status:'success',message:'user registered successfully!','user':user})
         }
   
   
    } catch (error) {
        res.json({status:'failed','message':'something went wrong!'})
       // console.log(error)
        
    }
    
}

const login =async(req,res)=>{
   try {
    const {email,password} = req.body 
    const existUser =await findUserByfield(email)
    if(existUser){
        const existpassword = existUser.password
       
        const matchPassword = await validateUser(password,existpassword)
        if(matchPassword){
            const {_id} = existUser
            const accessToken =await createAccessToken(_id)
            const refreshToken = await createRefreshToken(_id)
          
            res.json({status:'success',message:'successfully login','AccessToken':accessToken,'RefreshToken':refreshToken})
            

        }else{
            res.json({status:'failed','message':'authentication failed!'})
        }

    }else{
        res.json({status:'failed','message':'user does not exist'})
    }
   } catch (error) {
    res.json({status:'failed','message':'something went wrong!', error})
   }
}
const userprofile = async(req,res) =>{
    try {
        const id = req.userId  
        const user = await findUserById(id)
        res.json({status:'success',user})
    } catch (error) {
        res.json({status:'failed','message':'user does not exits!'})
        
    }
    
}

const logout = async(req,res)=>{
    try {
        const {authorization} = req.headers
   const token = authorization
   const id = req.userId 
  
   await findByuserIdandUpdate(id)
   await deletJwtAccessToken(token)
res.json({status:'success','message':'logout successfully!'})
    } catch (error) {
        console.log(error)
        
    }

}


export {register,login,userprofile,logout}