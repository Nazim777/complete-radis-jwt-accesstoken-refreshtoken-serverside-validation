import express from 'express' 
const router = express.Router()
import {refreshToken} from '../Controller/refreshTokenController.js'
router.get('/',refreshToken)
export default router