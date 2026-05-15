import pool from '../config/db';

export interface Project {
  id?: number;
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  created_by: number;
}

export const ProjectModel = {
  async findAll() {
    const [rows] = await pool.query(
      'SELECT p.*, u.name as creator_name FROM projects p JOIN users u ON p.created_by = u.id'
    );
    return rows;
  },

  async findById(id: number) {
    const [rows]: any = await pool.query(
      'SELECT p.*, u.name as creator_name FROM projects p JOIN users u ON p.created_by = u.id WHERE p.id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async findByUser(userId: number) {
    const [rows] = await pool.query(
      `SELECT p.*, pa.completed, pa.completed_at, pa.assigned_at
       FROM projects p
       JOIN project_assignments pa ON p.id = pa.project_id
       WHERE pa.user_id = ?`,
      [userId]
    );
    return rows;
  },

  async create(project: Project) {
    const [result]: any = await pool.query(
      'INSERT INTO projects (title, description, status, due_date, created_by) VALUES (?, ?, ?, ?, ?)',
      [project.title, project.description, project.status || 'pending', project.due_date, project.created_by]
    );
    return result.insertId;
  },

  async update(id: number, data: Partial<Project>) {
    const [result]: any = await pool.query(
      'UPDATE projects SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?',
      [data.title, data.description, data.status, data.due_date, id]
    );
    return result.affectedRows;
  },

  async delete(id: number) {
    const [result]: any = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows;
  },
};