import express from 'express';
import { checkAuth, login, logout, passwordReset, passwordResetReq, signup, verifyEmail } from '../Controller/auth.controller.js';
import { authMiddleware } from '../Middleware/auth.middleware.js';

const router=express.Router();

router.get('/check-auth',authMiddleware,checkAuth);
router.post('/signup',signup);
router.post('/login',login);
router.post('/verify-email',verifyEmail);
router.post('/logout',logout);
router.post('/reset-pass-req',passwordResetReq);
router.post('/reset-pass/:token',passwordReset);


export default router;