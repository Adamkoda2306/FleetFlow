import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";

/* User roles */
export type UserRole = "USER" | "ADMIN";

/* User entity returned from database */
export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

/* MySQL row type */
interface UserRow extends RowDataPacket, User {}

/* User Model */
export class UserModel {
  // Find user by ID
  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        is_verified,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        is_verified,
        created_at,
        updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  // Create a new user
  static async create(
    name: string,
    email: string,
    passwordHash: string,
    role: UserRole = "USER"
  ): Promise<User> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO users (
        name,
        email,
        password_hash,
        role
      )
      VALUES (?, ?, ?, ?)
      `,
      [name, email, passwordHash, role]
    );

    const user = await this.findById(result.insertId);

    if (!user) {
      throw new Error("User was created but could not be retrieved");
    }

    return user;
  }

  // Update user name
  static async updateName(
    id: number,
    name: string
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE users
      SET name = ?
      WHERE id = ?
      `,
      [name, id]
    );

    return result.affectedRows > 0;
  }

  // Update user's password
  static async updatePassword(
    id: number,
    passwordHash: string
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
      `,
      [passwordHash, id]
    );

    return result.affectedRows > 0;
  }

  // Verify user account
  static async verifyUser(
    id: number
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE users
      SET is_verified = TRUE
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows > 0;
  }

  // Update user role
  static async updateRole(
    id: number,
    role: UserRole
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE users
      SET role = ?
      WHERE id = ?
      `,
      [role, id]
    );

    return result.affectedRows > 0;
  }

  // Delete user
  static async delete(
    id: number
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      DELETE FROM users
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows > 0;
  }
}