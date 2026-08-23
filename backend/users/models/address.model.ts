import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";

export type AddressType = 'HOME' | 'OFFICE' | 'OTHERS';
export interface IAddress {
    id: string;
    user_id: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    longitude: number;
    latitude: number;
    created_at: Date;
    updated_at: Date;
};

interface AddressRow extends RowDataPacket, IAddress {}

export class AddressModel {
    // create Address
    static async create(
        id: string, 
        user_id: string, 
        address_line1: string, 
        address_line2: string, 
        city: string, 
        state: string, 
        country: string = 'India',
        pincode: string,
        type: AddressType = 'HOME', 
        longitude: number, 
        latitude: number): Promise<boolean> {
            const [result] = await pool.execute<ResultSetHeader>(
                `
                INSERT INTO \`users-address\` (
                    id,
                    user_id,
                    address_line1,
                    address_line2,
                    city,
                    state,
                    country,
                    pincode,
                    type,
                    longitude,
                    latitude
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [id, user_id, address_line1, address_line2, city, state, country, pincode, type, longitude, latitude]
            );
            return result.affectedRows > 0;
    }

    // find address by id
    static async findById(id: string): Promise<AddressRow | []> {
        const [row] = await pool.execute<AddressRow[]>(
            `SELECT * FROM \`users-address\` WHERE id = ? LIMIT 1`,
            [id]
        );
        return row.length > 0 ? row[0] : [];
    }

    // find address by user_id
    static async findByUserId(user_id: string): Promise<AddressRow[] | []> {
        const [row] = await pool.execute<AddressRow[]>(
            `SELECT * FROM \`users-address\` WHERE user_id = ?`,
            [user_id]
        );
        return row.length > 0 ? row : [];
    }

    // update address
    static async updateById(
        id: string, 
        address_line1: string, 
        address_line2: string, 
        city: string, 
        state: string,
        country: string = 'India', 
        pincode: string, 
        type: AddressType,
        longitude: number, 
        latitude: number): Promise<boolean> {
            const [result] = await pool.execute<ResultSetHeader>(
                `
                UPDATE \`users-address\`
                SET address_line1 = ?, 
                    address_line2 = ?, 
                    city = ?,
                    state = ?,
                    country = ?,
                    pincode = ?,
                    type = ?,
                    longitude = ?,
                    latitude = ?
                WHERE id = ?
                `,
                [address_line1, address_line2, city, state, country, pincode, type, longitude, latitude, id]
            );
            return result.affectedRows > 0;
    }

    // delete address
    static async delete(id: string): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            `
            DELETE FROM \`users-address\` WHERE id = ?
            `,
            [id]
        );
        return result.affectedRows > 0;
    }
}