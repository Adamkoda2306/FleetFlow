import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/db.config";

export type HistoryStatus = 'CREATED' | 'CONFIRMED' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'FAILED';
export interface IHistory {
    id: string;
    user_id: string;
    payment_id: string;
    order_id: string;
    status: HistoryStatus;
    order_at: Date;
    received_at: Date;
    created_at: Date;
    updated_at: Date;
};

interface HistoryRow extends RowDataPacket, IHistory {};

export class HistoryModel {
    // create history
    static async create(
        id: string,
        payment_id: string,
        order_id: string,
        status: HistoryStatus = 'CREATED',
        order_at: Date,
        user_id: string,
    ):Promise<boolean> {
        const [row] = await pool.execute<ResultSetHeader>(
            `
            INSERT INTO \`users-history\` (
                id,
                user_id,
                payment_id,
                order_id, 
                status,
                order_at
            ) VALUES (?, ?, ?, ?, ?, ?)
            `,
            [id, user_id, payment_id, order_id, status, order_at]
        );
        return row.affectedRows > 0;
    }

    // find history by id
    static async findById(id: string): Promise<HistoryRow | []> {
        const [row] = await pool.execute<HistoryRow[]>(
            `
            SELECT * FROM \`users-history\` WHERE id = ?
            `,
            [id]
        );
        return row.length > 0 ? row[0] : [];
    }

    // find history by user_id
    static async findByUserId(user_id: string): Promise<HistoryRow[] | []> {
        const [row] = await pool.execute<HistoryRow[]>(
            `
            SELECT * FROM \`users-history\` WHERE user_id = ?
            `,
            [user_id]
        );
        return row.length > 0 ? row : [];
    }

    // update status in history
    static async updateStatus(id: string, status: HistoryStatus): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            `
            UPDATE \`users-history\`
            SET status = ?
            WHERE id = ?
            `,
            [status, id]
        );
        return result.affectedRows > 0;
    }

    // update received at in history
    static async updateReceivedAt(id: string, received_at: Date): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            `
            UPDATE \`users-history\`
            SET received_at = ?
            WHERE id = ?
            `,
            [received_at, id]
        );
        return result.affectedRows > 0;
    }

    // delete history
    static async delete(id: string): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            `
            DELETE FROM \`users-history\` WHERE id = ?
            `,
            [id]
        );
        return result.affectedRows > 0;
    }

}