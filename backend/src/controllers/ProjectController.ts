import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { ProjectModel } from '../models/Project';

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await ProjectModel.findAll();
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel.findById(Number(req.params.id));
    if (!project) {
      res.status(404).json({ message: 'Proyecto no encontrado' });
      return;
    }
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Error al obtener proyecto' });
  }
};

export const getMyProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await ProjectModel.findByUser(req.user!.id);
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
};

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, status, due_date } = req.body;
    if (!title) {
      res.status(400).json({ message: 'El título es obligatorio' });
      return;
    }
    const id = await ProjectModel.create({
      title, description, status, due_date,
      created_by: req.user!.id,
    });
    res.status(201).json({ message: 'Proyecto creado', id });
  } catch {
    res.status(500).json({ message: 'Error al crear proyecto' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const affected = await ProjectModel.update(Number(req.params.id), req.body);
    if (!affected) {
      res.status(404).json({ message: 'Proyecto no encontrado' });
      return;
    }
    res.json({ message: 'Proyecto actualizado' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar proyecto' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const affected = await ProjectModel.delete(Number(req.params.id));
    if (!affected) {
      res.status(404).json({ message: 'Proyecto no encontrado' });
      return;
    }
    res.json({ message: 'Proyecto eliminado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar proyecto' });
  }
};