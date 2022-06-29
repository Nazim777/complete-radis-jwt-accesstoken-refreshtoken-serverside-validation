import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
       required:true,
       maxlength:50
        
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6 
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    refreshJWT:{
        token:{
            type:String,
            maxlength:500,
            default:""
        },
        addedAt:{
            type:Date,
            required:true,
            default:Date.now()
        }
    }

})
const UserModel = mongoose.model('user',UserSchema)
export default UserModel