import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser, updateProfile } from '../Controller/userController.js';
import upload from '../middleware/Multer.js';

const userRouter = express.Router();

userRouter.get('/getcurrentuser', isAuth, getCurrentUser )
userRouter.post('/profile', isAuth,upload.single("photoUrl"), updateProfile )
export default userRouter;