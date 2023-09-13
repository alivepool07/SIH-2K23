import { Router } from 'express';
import { currUser, login, logout, register, update } from '../controllers/user.js';
import { checkSession } from '../middlewares/authHandler.js';

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/curr',checkSession,currUser);
router.get('/logout',logout);

///to be implemented later
router.put('/update',update);

export default router;