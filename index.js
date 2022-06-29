import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config() 
const app = express()
const port = process.env.PORT || 5000
morgan('tiny')
import database from './DB/database.js'
import router from './Routes/UserRouter.js'
import refreshRouter from './Routes/RefreshRouter.js'
app.use(express.json())
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// database connection 
database()
//user routes 
app.use('/api/user',router)
//refresh routes
app.use('/api/refreshtoken',refreshRouter)

app.post('/post',(req,res)=>{
   // console.log(hello)
    const {name} = req.body 
    console.log(name)
    res.json(name)
})





//error handeler
app.use((req,res,next)=>{
    const error = new Error('Resource not found!')
    error.status= 404 ;
    next(error)
})
app.use((error,req,res,next)=>{
errorHndler(error,res)
})
const errorHndler = (error,res)=>{
    res.status(error.status || 500)
    res.json({message:error.message})
}

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})