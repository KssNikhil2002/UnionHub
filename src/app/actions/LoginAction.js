'use server'
import bcrypt from 'bcrypt';
import db from '@/lib/db';

export default async function Login(data){
    const { email, password } = data;
    if (!email || !password) {
        return { error: 'Missing required fields' };
    }
    try {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        const user = result.rows[0];
        if (!user) {
            return { error: 'User not found' };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: 'Invalid password' };
        }
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword};
    } catch (error) {
        return { error: 'Internal server error' };
    }
}