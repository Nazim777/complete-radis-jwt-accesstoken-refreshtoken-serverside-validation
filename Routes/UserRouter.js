import express from 'express'
const router = express.Router()
import{ register,login,userprofile,logout} from '../Controller/userController.js'
import userMiddlewares from '../Middleware/UserMiddleware.js'
import formvalidation from '../Middleware/FormValidation.js'
router.post('/register',formvalidation, register)
router.post('/login',login)
router.get('/profile', userMiddlewares,userprofile)
router.get('/logout',userMiddlewares,logout)
export default router







