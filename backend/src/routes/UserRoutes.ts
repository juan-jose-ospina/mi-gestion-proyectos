import { Router} from "express";
import{ getUsers, getUserById, createUser, updateUser } from "../controllers/UserController";
import { verifyToken, isSuperAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, isSuperAdmin, createUser);
router.put('/:id', verifyToken, isSuperAdmin, updateUser);

export default router;