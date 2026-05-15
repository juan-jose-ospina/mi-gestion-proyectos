import { Router } from "express";
import { getAssignments, assignProject, markCompleted,deleteAssignment, getDashboard} from "../controllers/AssignmentController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get('/', verifyToken, getAssignments);
router.post('/', verifyToken, assignProject);
router.put('/', verifyToken, markCompleted);
router.delete('/:id', verifyToken, deleteAssignment);
router.get('/dashboard', verifyToken, getDashboard);
export default router;