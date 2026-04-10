import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

/**
 * POST /login
 * Public endpoint — no authentication required
 * Body: { username, password }
 */
router.post('/', login);

export default router;
