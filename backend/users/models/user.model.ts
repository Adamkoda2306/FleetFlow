import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";


export type UserRole = "USER" | "ADMIN" | "MEDIATER";
export interface User {
  id: string;
  name: string;
  email: string;
  phonenumber: string;
  role: UserRole;
  is_active: boolean;
  fcm_token: string;
  created_at: Date;
  updated_at: Date;
}

/* MySQL row type */
interface UserRow extends RowDataPacket, User {}


export class UserModel {

  // Get all users
  static async getAllUsers(): Promise<User[] | []> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT * FROM \`users-main\`;
      `
    );
    return rows.length > 0 ? rows : [];
  }

  // Find user by ID
  static async findById(id: string): Promise<User | []> {
    const [rows] = await pool.execute<UserRow[]>(
      `
      SELECT *
      FROM \`users-main\`
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
      SELECT *
      FROM \`users-main\`
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    return rows.length > 0 ? rows[0] : [];
  }

  static async findByPhonenumber(phone: string): Promise<User | []> {
    const [row] = await pool.execute<UserRow[]>(
      `
      SELECT *
      FROM \`users-main\`
      WHERE phonenumber = ?
      LIMIT 1
      `,
      [phone]
    );

    return row.length > 0 ? row[0] : [];
  }

  // Create a new user
  static async create(
    id: string,
    name: string,
    email: string,
    phonenumber: string,
    fcm_token: string,
    is_active: true,
    role: UserRole = "USER"
  ): Promise<User | []> {
    await pool.execute<ResultSetHeader>(
      `
      INSERT INTO \`users-main\` (
        id,
        name,
        email,
        phonenumber,
        role,
        is_active,
        fcm_token
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [id, name, email, phonenumber, role, is_active, fcm_token]
    );

    const user: User | [] = await this.findById(id);

    if (!user) {
      throw new Error("User was created but could not be retrieved");
    }

    return user;
  }

  // Update user name
  static async updateName(
    id: string,
    name: string
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE \`users-main\`
      SET name = ?
      WHERE id = ?
      `,
      [name, id]
    );

    return result.affectedRows > 0;
  }

  // Update user's password
  static async updatePhonenumber(
    id: string,
    phonenumber: string
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE \`users-main\`
      SET phonenumber = ?
      WHERE id = ?
      `,
      [phonenumber, id]
    );
    return result.affectedRows > 0;
  }

  // Update user role
  static async updateRole(
    id: string,
    role: UserRole
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE \`users-main\`
      SET role = ?
      WHERE id = ?
      `,
      [role, id]
    );

    return result.affectedRows > 0;
  }

  // Update user fcm_token
  static async updateFcmToken(id: string, fcm_token: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE \`users-main\`
      SET fcm_token = ?
      WHERE id = ?
      `,
      [fcm_token, id]
    );

    return result.affectedRows > 0;
  }

  // Update user is_active
  static async updateIsActive(id: string, is_active: boolean): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE \`users-main\`
      SET is_active = ?
      WHERE id = ?
      `,
      [is_active, id]
    );
    return result.affectedRows > 0;
  }

  // Delete user
  static async delete(
    id: string
  ): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      DELETE FROM \`users-main\`
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows > 0;
  }
}