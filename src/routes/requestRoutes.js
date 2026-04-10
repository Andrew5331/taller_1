import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { handleRequest } from '../controllers/requestController.js';

const router = Router();

/**
 * POST /request
 * Protected endpoint — requires a valid JWT (Bearer token)
 * authenticate middleware runs first, then handleRequest
 */
router.post('/', authenticate, handleRequest);

export default router;
