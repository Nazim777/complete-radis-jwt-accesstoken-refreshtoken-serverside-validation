import mongoose from "mongoose"
const database =async()=>{
    try {
        await mongoose.connect(process.env.database)
        console.log('database connected successfully!')
    } catch (error) {
        console.log(error)
        
    }
}
export default database