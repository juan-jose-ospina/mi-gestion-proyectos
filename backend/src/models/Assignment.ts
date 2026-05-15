import pool from '../config/db';

export const AssignmentModel = {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT pa.*, u.name as user_name, p.title as project_title
       FROM project_assignments pa
       JOIN users u ON pa.user_id = u.id
       JOIN projects p ON pa.project_id = p.id`
    );
    return rows;
  },

  async findById(id: number) {
    const [rows]: any = await pool.query(
      `SELECT pa.*, u.name as user_name, p.title as project_title
       FROM project_assignments pa
       JOIN users u ON pa.user_id = u.id
       JOIN projects p ON pa.project_id = p.id
       WHERE pa.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async assign(projectId: number, userId: number, assignedBy: number) {
    const [result]: any = await pool.query(
      'INSERT INTO project_assignments (project_id, user_id, assigned_by) VALUES (?, ?, ?)',
      [projectId, userId, assignedBy]
    );
    return result.insertId;
  },

  async markCompleted(projectId: number, userId: number) {
    const [result]: any = await pool.query(
      'UPDATE project_assignments SET completed = 1, completed_at = NOW() WHERE project_id = ? AND user_id = ?',
      [projectId, userId]
    );
    return result.affectedRows;
  },

  async delete(id: number) {
    const [result]: any = await pool.query(
      'DELETE FROM project_assignments WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },

  async getDashboardStats() {
    const [rows] = await pool.query(
      `SELECT
         u.id, u.name, u.email, u.is_active,
         COUNT(pa.id) as total_assigned,
         SUM(pa.completed) as total_completed
       FROM users u
       LEFT JOIN project_assignments pa ON u.id = pa.user_id
       WHERE u.role_id = 2
       GROUP BY u.id`
    );
    return rows;
  },
};