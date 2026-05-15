import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { UserModel } from '../models/User';

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(Number(req.params.id));
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, role_id } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
      return;
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      res.status(400).json({ message: 'El email ya está registrado' });
      return;
    }

    const id = await UserModel.create({ name, email, password, role_id: role_id || 2 });
    res.status(201).json({ message: 'Usuario creado', id });
  } catch {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const affected = await UserModel.update(Number(req.params.id), req.body);
    if (!affected) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json({ message: 'Usuario actualizado' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const affected = await UserModel.delete(Number(req.params.id));
    if (!affected) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json({ message: 'Usuario eliminado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};