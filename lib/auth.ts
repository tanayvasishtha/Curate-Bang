import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        return null;
    }
}

export async function createUser(email: string, password: string, name?: string) {
    const hashedPassword = await hashPassword(password);

    const [user] = await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
    }).returning();

    return user;
}

export async function authenticateUser(email: string, password: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
        return null;
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        return null;
    }

    return { id: user.id, email: user.email, name: user.name };
}