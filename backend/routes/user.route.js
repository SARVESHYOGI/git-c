import express from 'express';
import { getUserProfileAndRepos } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/profile/:username', getUserProfileAndRepos);

export default router;
