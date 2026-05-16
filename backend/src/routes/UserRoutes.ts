import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController';
import { verifyToken, isSuperAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.use(verifyToken, isSuperAdmin);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;