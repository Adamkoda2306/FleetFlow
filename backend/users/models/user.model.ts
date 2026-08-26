import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";
import { Pool, PoolConnection } from "mysql2/promise";


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
  static async getAllUsers(
    connection: Pool | PoolConnection = pool
  ): Promise<User[] | []> {
    const [rows] = await connection.execute<UserRow[]>(
      `
      SELECT * FROM \`users-main\`;
      `
    );
    return rows.length > 0 ? rows : [];
  }

  // Find user by ID
  static async findById(
    id: string,
    connection: Pool | PoolConnection = pool
  ): Promise<User | []> {
    const [rows] = await connection.execute<UserRow[]>(
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
  static async findByEmail(
    email: string,
    connection: Pool | PoolConnection = pool
  ): Promise<User | []> {
    const [rows] = await connection.execute<UserRow[]>(
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

  static async findByPhonenumber(
    phone: string,
    connection: Pool | PoolConnection = pool
  ): Promise<User | []> {
    const [row] = await connection.execute<UserRow[]>(
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
    is_active: boolean = true,
    role: UserRole = "USER",
    connection: Pool | PoolConnection = pool
  ): Promise<User | []> {
    await connection.execute<ResultSetHeader>(
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
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [id, name, email, phonenumber, role, is_active, fcm_token]
    );

    const user: User | [] = await this.findById(id, connection);

    if (!user) {
      throw new Error("User was created but could not be retrieved");
    }

    return user;
  }

  // Update user name
  static async updateName(
    id: string,
    name: string,
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
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
    phonenumber: string,
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
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
    role: UserRole,
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
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
  static async updateFcmToken(
    id: string, 
    fcm_token: string, 
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
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
  static async updateIsActive(
    id: string, 
    is_active: boolean, 
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
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
    id: string,
    connection: Pool | PoolConnection = pool
  ): Promise<boolean> {
    const [result] = await connection.execute<ResultSetHeader>(
      `
      DELETE FROM \`users-main\`
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows > 0;
  }
}