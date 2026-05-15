import pool from '../config/db';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  role_id: number;
  name: string;
  email: string;
  password: string;
  is_active?: number;
  created_at?: Date;
  updated_at?: Date;
}

export const UserModel = {
  async findAll() {
    const [rows] = await pool.query(
      'SELECT u.id, u.name, u.email, u.is_active, u.created_at, r.name as role FROM users u JOIN roles r ON u.role_id = r.id'
    );
    return rows;
  },

  async findById(id: number) {
    const [rows]: any = await pool.query(
      'SELECT u.id, u.name, u.email, u.is_active, u.created_at, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async findByEmail(email: string) {
    const [rows]: any = await pool.query(
      'SELECT u.*, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async create(user: User) {
    const hash = await bcrypt.hash(user.password, 10);
    const [result]: any = await pool.query(
      'INSERT INTO users (role_id, name, email, password) VALUES (?, ?, ?, ?)',
      [user.role_id, user.name, user.email, hash]
    );
    return result.insertId;
  },

  async update(id: number, data: Partial<User>) {
    const [result]: any = await pool.query(
      'UPDATE users SET name = ?, email = ?, is_active = ? WHERE id = ?',
      [data.name, data.email, data.is_active, id]
    );
    return result.affectedRows;
  },

  async delete(id: number) {
    const [result]: any = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  },
};