import express from 'express'
import { sendResponse } from '../utils/response.Obj.js';
import AuthController from '../controllers/auth.controller.js';


const router = express.Router()
router.post('/login',AuthController.loginFunct)


export default router;
