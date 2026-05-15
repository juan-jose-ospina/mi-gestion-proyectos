import { Router } from "express";
import { getProjects, getProjectById,getMyProjects,createProject,updateProject,deleteProject } from "../controllers/ProjectController";

const router = Router();

router.get('/', getProjects);
router.get('/my', getMyProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
export default router;