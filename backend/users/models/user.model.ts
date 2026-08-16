import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";

/* User roles */
export type UserRole = "USER" | "ADMIN" | "MEDIATER";

/* User entity returned from database */
export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

/* MySQL row type */
interface UserRow extends RowDataPacket, User {}

/* User Model */
export class UserModel {
  // Get all users
  static async getAllUsers(): Promise<User[] | []> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT * FROM users;
      `
    );
    return rows.length > 0 ? rows : [];
  }

  // Find user by ID
  static async findById(id: string): Promise<User | []> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows.length > 0 ? rows[0] : [];
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | []> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        created_at,
        updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    return rows.length > 0 ? rows[0] : [];
  }

  // Create a new user
  static async create(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    role: UserRole = "USER"
  ): Promise<User> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO users (
        id
        name,
        email,
        password_hash,
        role
      )
      VALUES (?, ?, ?, ?)
      `,
      [id, name, email, passwordHash, role]
    );

    const user = await this.findById(result.id);

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