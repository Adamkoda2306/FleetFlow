import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";

export interface IAuth {
    user_id: string;
    name: string;
    email: string;
    password_hash: string;
    phonenumber: string;
    otp: string;
    otp_expires_at: Date;
    created_at: Date;
    updated_at: Date;
};

interface AuthRow extends RowDataPacket, IAuth {};

// Auth DAO
export class AuthModel {
    // create Auth 
    static async create(
        user_id: string,
        name: string,
        email: string,
        password_hash: string,
        phonenumber: string
    ):Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            INSERT INTO auth (
                user_id,
                name,
                email,
                password_hash,
                phonenumber
            ) VALUES (?, ?, ?, ?, ?)
            `,
            [user_id, name, email, password_hash, phonenumber]
        );
        return row.affectedRows > 0;
    }

    // find by user id
    static async findByUserId(user_id: string): Promise<AuthRow | []> {
        const [row] = await pool.execute<AuthRow[]>(
            `
            SELECT * FROM auth WHERE user_id = ?
            `,
            [user_id]
        );
        return row.length > 0 ? row[0] : [];
    }

    // findByEmail
    static async findByEmail(email: string): Promise<AuthRow | []> {
        const [row] = await pool.execute<AuthRow[]>(
            `
            SELECT * FROM auth WHERE email = ?
            `,
            [email]
        );
        return row.length > 0 ? row[0] : [];
    }

    // find by phonenumber
    static async findByPhonenumber(phonenumber: string): Promise<AuthRow | []> {
        const [row] = await pool.execute<AuthRow[]>(
            `
            SELECT * FROM auth WHERE phonenumber = ?
            `,
            [phonenumber]
        );
        return row.length > 0 ? row[0] : [];
    }

    // update phonenumber
    static async updatePhonenumber(user_id: string, phonenumber: string): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            UPDATE auth
            SET phonenumber = ?
            WHERE user_id = ?
            `,
            [phonenumber, user_id]
        );
        return row.affectedRows > 0;
    }

    // update email
    static async updateEmail(user_id: string, email: string): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            UPDATE auth
            SET email = ?
            WHERE user_id = ?
            `,
            [email, user_id]
        );
        return row.affectedRows > 0;
    }

    // update name
    static async updateName(user_id: string, name: string): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            UPDATE auth
            SET name = ?
            WHERE user_id = ?
            `,
            [name, user_id]
        );
        return row.affectedRows > 0;
    }

    // update password_hash
    static async updatePassword(user_id: string, password_hash: string): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            UPDATE auth
            SET password_hash = ?
            WHERE user_id = ?
            `,
            [password_hash, user_id]
        );
        return row.affectedRows > 0;
    }

    // update otp and otp_expires_at
    static async updateOTP(user_id: string, otp: string, otp_expires_at: Date): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            UPDATE auth
            SET otp = ?, otp_expires_at = ?
            WHERE user_id = ?
            `,
            [otp, otp_expires_at, user_id]
        );
        return row.affectedRows > 0;
    }

    // delete
    static async delete(user_id: string): Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            DELETE FROM auth WHERE user_id = ?
            `,
            [user_id]
        );
        return row.affectedRows > 0;
    }
};