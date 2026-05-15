import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { AssignmentModel } from '../models/Assignment';

export const getAssignments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const assignments = await AssignmentModel.findAll();
    res.json(assignments);
  } catch {
    res.status(500).json({ message: 'Error al obtener asignaciones' });
  }
};

export const assignProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { project_id, user_id } = req.body;
    if (!project_id || !user_id) {
      res.status(400).json({ message: 'project_id y user_id son obligatorios' });
      return;
    }
    const id = await AssignmentModel.assign(project_id, user_id, req.user!.id);
    res.status(201).json({ message: 'Proyecto asignado', id });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'El usuario ya tiene este proyecto asignado' });
      return;
    }
    res.status(500).json({ message: 'Error al asignar proyecto' });
  }
};

export const markCompleted = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { project_id } = req.body;
    if (!project_id) {
      res.status(400).json({ message: 'project_id es obligatorio' });
      return;
    }
    const affected = await AssignmentModel.markCompleted(project_id, req.user!.id);
    if (!affected) {
      res.status(404).json({ message: 'Asignación no encontrada' });
      return;
    }
    res.json({ message: 'Proyecto marcado como completado' });
  } catch {
    res.status(500).json({ message: 'Error al completar proyecto' });
  }
};

export const deleteAssignment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const affected = await AssignmentModel.delete(Number(req.params.id));
    if (!affected) {
      res.status(404).json({ message: 'Asignación no encontrada' });
      return;
    }
    res.json({ message: 'Asignación eliminada' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar asignación' });
  }
};

export const getDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await AssignmentModel.getDashboardStats();
    res.json(stats);
  } catch {
    res.status(500).json({ message: 'Error al obtener dashboard' });
  }
};