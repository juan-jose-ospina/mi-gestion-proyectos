import { Router } from 'express';
import { getAssignments, assignProject, markCompleted, deleteAssignment, getDashboard } from '../controllers/AssignmentController';
import { verifyToken, isSuperAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(verifyToken);

router.get('/dashboard', isSuperAdmin, getDashboard);
router.get('/', isSuperAdmin, getAssignments);
router.post('/', isSuperAdmin, assignProject);
router.delete('/:id', isSuperAdmin, deleteAssignment);
router.put('/complete', markCompleted);     // usuario común

export default router;