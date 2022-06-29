import UserModel from "../Model/UserModel.js"
import bcrypt from 'bcrypt'
import { createClient } from 'redis';
const createUSer = async(name,email,password)=>{
    const hashpassword = await bcrypt.hash(password,10)
const data = UserModel({
    name,email,password:hashpassword
})
const result = await data.save()
return result 

}

const findUserByfield =async(email)=>{
    
        const data = await UserModel.findOne({email})
       // console.log(data)
        return data 
    
}

const validateUser = async(password,existpassword)=>{
    const validate = await bcrypt.compare(password,existpassword)
    return validate
}

const storeRefreshJwt = async(_id,token)=>{
   // console.log({id:_id,token:token})
  // console.log(token)
  try {
    await UserModel.findByIdAndUpdate({_id},{$set:{"refreshJWT.token":token,"refreshJWT.addedAt":Date.now()}})
  } catch (error) {
    console.log(error)
  }

}

const storeAccessJwt = async(token,_id)=>{
    
   
   // console.log(typeof(_id),typeof(token))
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set(token, _id);

}

const getJwtAccessToken = async(token)=>{
    
   
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
  const _id = await client.get(token);
  return _id 
  

}

const deletJwtAccessToken = async(token) =>{

  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
 await client.del(token);

}


const findUserById = async(id)=>{
    const data = await UserModel.findById(id)
    return data 
}

const findByuserIdandUpdate = async(id)=>{
  await UserModel.findByIdAndUpdate(id,{$set:{"refreshJWT.token":'',"refreshJWT.addedAt":Date.now()}})

}


export{createUSer,findUserByfield,validateUser,storeRefreshJwt,storeAccessJwt, getJwtAccessToken,findUserById,deletJwtAccessToken,findByuserIdandUpdate}