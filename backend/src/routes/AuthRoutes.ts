import { Router } from "express";
import { register, login } from "../controllers/AuthController";
import { verifyToken } from "../middlewares/authMiddleware";
import { ref } from "node:process";

const router = Router();

router.post('/register', register);
router.post('/login', login);
export default router;