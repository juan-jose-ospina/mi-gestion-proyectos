import { Router } from 'express';
import { getProjects, getProjectById, getMyProjects, createProject, updateProject, deleteProject } from '../controllers/ProjectController';
import { verifyToken, isSuperAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(verifyToken);

router.get('/my', getMyProjects);           // usuario común
router.get('/', isSuperAdmin, getProjects); // solo superadmin
router.get('/:id', isSuperAdmin, getProjectById);
router.post('/', isSuperAdmin, createProject);
router.put('/:id', isSuperAdmin, updateProject);
router.delete('/:id', isSuperAdmin, deleteProject);

export default router;