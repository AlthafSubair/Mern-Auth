import express from 'express'
import { checkAuth, forgotPassword, logIn, logOut, resetPassword, singUp, verifyEmail } from '../controllers/authControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const authRouter = express.Router()

authRouter.post('/signin', singUp)
authRouter.post('/verfy-email', verifyEmail)
authRouter.post('/login', logIn)
authRouter.post('/logout', logOut)
authRouter.post('/forgot_password', forgotPassword)
authRouter.post('/reset_password/:token', resetPassword)


authRouter.get('/check_auth', verifyToken, checkAuth)

export default authRouter;