'use server';

import bcrypt from 'bcrypt'
import db from '@/lib/db'

export default async function Register(data){
    const { username, email, password, location } = data;
    if (!username || !email || !password || !location) {
        return { error: 'Missing required fields' };
    }
    try {

        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return { error: 'User already exists' };
        }

        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                location VARCHAR(100) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.query(
            'INSERT INTO users (username, email, password, location) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, location]
        );
        const user = result.rows[0];

        return { user };
    } catch (error) {
        console.error('Error registering user:', error);
        return { error: 'Internal server error' };
    }
}
